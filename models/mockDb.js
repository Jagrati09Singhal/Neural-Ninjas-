// Mock database for Aadhaar-Phone mapping
const mockAadhaarDb = new Map([
    // Format: [aadhaar, { phone, name }]
    ['123456789012', { phone: '9876543210', name: 'Rajesh Gupta' }],
    ['987654321098', { phone: '8765432109', name: 'Arjun Singh' }],
    ['456789123456', { phone: '7654321098', name: 'Rahul Sharma' }],
    ['425673875628', { phone: '9345324512', name: 'Priya Bansal' }],
    ['784993653355', { phone: '9865374826', name: 'Abhinav Sharma' }],
    ['736783287647', { phone: '8264426728', name: 'Rohit Garg' }],
    ['485663215457', { phone: '4523658795', name: 'Punit Singh' }],
    ['785214563214', { phone: '4654653157', name: 'Salman Khan' }],
    ['987465632445', { phone: '8988545321', name: 'Tanishq Garg' }],
]);

const VoterIdDatabase = {
    'ABC1234567': { aadhaar: '123456789012', name: 'Rajesh Gupta' },
    'XYZ9876543': { aadhaar: '987654321098', name: 'Arjun Singh' },
    'QWE4567890': { aadhaar: '456789123456', name: 'Rahul Sharma' },
    'WER2673636': { aadhaar: '425673875628', name: 'Priya Bansal' },
    'YIO2777458': { aadhaar: '784993653355', name: 'Abhinav Sharma'},
    'GTA2345623': { aadhaar: '736783287647', name: 'Rohit Garg' },  
    'YJK7896554': { aadhaar: '485663215457', name: 'Punit Singh' },
    'MNO4563217': { aadhaar: '785214563214', name: 'Salman Khan' },
    'RWT1236548': { aadhaar: '987465632445', name: 'Tanishq Garg' },
};

class AadhaarService {
    static validateAadhaar(aadhaarNumber) {
        // Basic Aadhaar validation (12 digits)
        return /^\d{12}$/.test(aadhaarNumber);
    }

    static validatePhone(phone) {
        // Basic Indian phone number validation (10 digits)
        return /^[6-9]\d{9}$/.test(phone);
    }

    static verifyAadhaarPhone(aadhaar, phone) {
        if (!this.validateAadhaar(aadhaar)) {
            throw new Error('Invalid Aadhaar number format');
        }

        if (!this.validatePhone(phone)) {
            throw new Error('Invalid phone number format');
        }

        const userData = mockAadhaarDb.get(aadhaar);
        
        if (!userData) {
            throw new Error('Aadhaar number not found');
        }

        if (userData.phone !== phone) {
            throw new Error('Phone number does not match Aadhaar records');
        }

        return userData;
    }

    // This would be replaced with actual Digilocker API integration
    static async verifyWithDigilocker(aadhaar) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return mockAadhaarDb.has(aadhaar);
    }
}

// Mock SMS Service
class SmsService {
    static async sendOtp(phone, otp) {
        // Simulate SMS API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log(`[SMS SIMULATION] Sending OTP ${otp} to ${phone}`);
        return {
            success: true,
            messageId: `MSG_${Date.now()}`
        };
    }
}

const VoterIdService = {
    verifyVoterId(voterId, aadhaar) {
        const record = VoterIdDatabase[voterId];
        if (!record) throw new Error('Voter ID not found');
        if (record.aadhaar !== aadhaar) throw new Error('Voter ID and Aadhaar do not match');
        return { name: record.name };
    }
};


module.exports = {
    AadhaarService,
    SmsService,
    VoterIdService
};