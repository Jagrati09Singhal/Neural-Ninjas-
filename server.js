const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const VoterLogin = require('./models/voterlogin');


dotenv.config();
const connectDB = require('./config/db');
const voteRoutes = require('./routes/voteRoutes');
const path = require('path');
const svgCaptcha = require('svg-captcha');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const { AadhaarService, SmsService, VoterIdService} = require('./models/mockDb');




if (!process.env.MONGO_URI) {
    console.error('❌ MONGO_URI is not defined in .env file');
    process.exit(1);
}

if (!process.env.PORT) {
    console.warn('⚠️  PORT not defined in .env, using default port 5000');
}


const app = express();


connectDB();


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());


app.use((req, res, next) => {
    console.log(`📝 ${req.method} ${req.url}`);
    next();
});


app.use(express.static(path.join(__dirname)));


app.use((req, res, next) => {

    res.setHeader('X-Frame-Options', 'DENY');

    res.setHeader('X-XSS-Protection', '1; mode=block');

    res.setHeader('X-Content-Type-Options', 'nosniff');

    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
});


app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 15 // 15 minutes
    }
}));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

app.get('/captcha', (req, res) => {
    const captcha = svgCaptcha.create({
        size: 6,
        noise: 2,
        color: true,
        background: '#f0f0f0'
    });
    
    req.session.captcha = captcha.text;
    
    res.type('svg');
    res.status(200).send(captcha.data);
});

app.post('/send-otp', async (req, res) => {
    try {
        const { aadhaar, phone, captchaInput, voterId} = req.body;

        if (!aadhaar || !phone || !captchaInput) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }
        
        if (!req.session.captcha || captchaInput.toLowerCase() !== req.session.captcha.toLowerCase()) {
            return res.status(400).json({
                success: false,
                message: 'Invalid CAPTCHA'
            });
        }

        if (!voterId || !/^[A-Z]{3}[0-9]{7}$/.test(voterId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Voter ID format'
            });
        }
        

        try {
            const userData = AadhaarService.verifyAadhaarPhone(aadhaar, phone);
            const isVerified = await AadhaarService.verifyWithDigilocker(aadhaar);
            if (!isVerified) {
                throw new Error('Failed to verify with Digilocker');
            }
            const otp = generateOTP();
            
            req.session.otp = {
                code: otp,
                aadhaar: aadhaar,
                phone: phone,
                voterId: voterId,
                name: userData.name,
                timestamp: Date.now(),
                attempts: 0
            };

            await SmsService.sendOtp(phone, otp);

            await VoterLogin.findOneAndUpdate(
                { aadhaar },
                {
                    aadhaar,
                    phone,
                    voterId,
                    name: userData.name
                },
                {
                    upsert: true, 
                    new: true,
                    setDefaultsOnInsert: true
                }
            );
            
            delete req.session.captcha;

            res.status(200).json({
                success: true,
                message: 'OTP sent successfully',
                userData: {
                    name: userData.name
                }
            });

        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

    } catch (error) {
        console.error('Error in /send-otp:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

app.post('/verify-otp', async (req, res) => {
    try {
        const { aadhaar, otp } = req.body;

        const sessionOtp = req.session.otp;

        if (
            !sessionOtp ||
            aadhaar !== sessionOtp.aadhaar ||
            otp !== sessionOtp.code ||
            Date.now() - sessionOtp.timestamp > 900000
        ) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired OTP'
            });
        }

        sessionOtp.attempts = (sessionOtp.attempts || 0) + 1;

        if (sessionOtp.attempts >= 3) {
            delete req.session.otp;
            return res.status(400).json({
                success: false,
                message: 'Maximum OTP verification attempts exceeded'
            });
        }
        await VoterLogin.findOneAndUpdate(
            { aadhaar: sessionOtp.aadhaar },
            {
                phone: sessionOtp.phone,
                voterId: sessionOtp.voterId,
                name: sessionOtp.name
            },
            {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            }
        );

        delete req.session.otp;

        res.status(200).json({
            success: true,
            message: 'OTP verified and voter login saved'
        });

    } catch (error) {
        console.error('Error in /verify-otp:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

app.use('/api', voteRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/vote', (req, res) => {
    res.sendFile(path.join(__dirname, 'vote.html'));
});

app.get('/results', (req, res) => {
    res.sendFile(path.join(__dirname, 'result.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/styles/styles.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'styles', 'styles.css'));
});

app.use('/api/*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint not found'
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`
    🚀 Server running in ${process.env.NODE_ENV || 'development'} mode
    👉 View your website at: http://localhost:${PORT}
    
    Available routes:
    📱 Frontend:
    - Home:     http://localhost:${PORT}
    - Login:    http://localhost:${PORT}/login
    - Vote:     http://localhost:${PORT}/vote
    - Results:  http://localhost:${PORT}/results
    - Admin:    http://localhost:${PORT}/admin
    
    🔌 API Endpoints:
    - Register: POST http://localhost:${PORT}/api/register
    - Vote:     POST http://localhost:${PORT}/api/vote
    - Results:  GET  http://localhost:${PORT}/api/results
    - Reset:    POST http://localhost:${PORT}/api/reset
    `);
});

process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    process.exit(1);
}); 