// ==============================================
// Global Constants and Data
// ==============================================

const candidates = [
    { id: 1, name: 'ChatGpt', party: 'Progressive Party', image: 'images/candidate1.svg', experience: '12 years in public service', focus: 'Environmental sustainability, Education' },
    { id: 2, name: 'Jane Doe', party: 'Democratic Alliance', image: 'images/candidate2.svg', experience: '8 years as District Representative', focus: 'Economic growth, Infrastructure' },
    { id: 3, name: 'Michael Johnson', party: 'Citizens United', image: 'images/candidate3.svg', experience: '15 years in Community Leadership', focus: 'Healthcare, Social equity' },
    { id: 4, name: 'Sarah Williams', party: 'People\'s Front', image: 'images/candidate4.svg', experience: '10 years in Urban Planning', focus: 'Housing affordability, Public transit' }
];

const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// ==============================================
// Utility Functions
// ==============================================

function validateAadhaar(aadhaar) {
    // Basic validation: 12 digits
    return /^\d{12}$/.test(aadhaar);
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

// ==============================================
// Login Page Logic (login.html)
// ==============================================

function initLoginPage() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', handleLogin);
}

function handleLogin(event) {
    event.preventDefault();

    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const aadhaar = document.getElementById('aadhaar')?.value;

    // Validate inputs
    if (!name || !email || !aadhaar) {
        showError('loginError', 'All fields are required');
        return;
    }

    if (!validateEmail(email)) {
        showError('loginError', 'Please enter a valid email address');
        return;
    }

    if (!validateAadhaar(aadhaar)) {
        showError('loginError', 'Please enter a valid 12-digit Aadhaar number');
        return;
    }

    // Store voter data
    const voterId = btoa(email + aadhaar).substring(0, 24); // Create unique voter ID
    sessionStorage.setItem('currentVoter', JSON.stringify({
        id: voterId,
        name,
        email
    }));

    // Simulate OTP verification
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log('OTP for verification:', otp);
    alert(`OTP sent to ${email}: ${otp}`);

    // Show OTP verification form
    const otpSection = document.getElementById('otpVerification');
    const loginSection = document.getElementById('loginSection');
    if (otpSection && loginSection) {
        loginSection.style.display = 'none';
        otpSection.style.display = 'block';
        startOTPTimer();
    }
}

function startOTPTimer() {
    let timeLeft = 120; // 2 minutes
    const timerElement = document.getElementById('otpTimer');
    const resendButton = document.getElementById('resendOTP');

    if (!timerElement || !resendButton) return;

    const timer = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            resendButton.disabled = false;
            timerElement.textContent = 'OTP expired';
        }
    }, 1000);
}

// ==============================================
// Voting Page Logic (vote.html)
// ==============================================

function initVotingPage() {
    const votingSection = document.getElementById('votingSection');
    if (!votingSection) return;

    // Check if user has already voted
    if (localStorage.getItem('hasVoted')) {
        showThankYouMessage();
        return;
    }

    renderCandidates();
}

function renderCandidates() {
    const candidateGrid = document.getElementById('candidateGrid');
    if (!candidateGrid) return;

    candidateGrid.innerHTML = candidates.map(candidate => `
        <div class="candidate-card">
            <img src="${candidate.image}" alt="${candidate.name}" class="candidate-image">
            <h3>${candidate.name}</h3>
            <p class="party">${candidate.party}</p>
            <p class="experience">${candidate.experience}</p>
            <p class="focus-areas">${candidate.focus}</p>
            <button class="vote-button" onclick="handleVote(${candidate.id})">Vote</button>
        </div>
    `).join('');
}

function handleVote(candidateId) {
    const voter = JSON.parse(sessionStorage.getItem('currentVoter'));
    if (!voter) {
        window.location.href = 'login.html';
        return;
    }

    // Store vote
    const votes = JSON.parse(localStorage.getItem('votes')) || [];
    votes.push({
        candidateId,
        voterId: voter.id,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('votes', JSON.stringify(votes));
    localStorage.setItem('hasVoted', 'true');

    showThankYouMessage();
    setTimeout(() => {
        window.location.href = 'result.html';
    }, 3000);
}

function showThankYouMessage() {
    const votingSection = document.getElementById('votingSection');
    const thankYouMessage = document.getElementById('thankYouMessage');
    if (votingSection && thankYouMessage) {
        votingSection.style.display = 'none';
        thankYouMessage.style.display = 'block';
    }
}

// ==============================================
// Results Page Logic (result.html)
// ==============================================

let resultsChart = null;

function initResultsPage() {
    if (!window.location.pathname.includes('result.html')) return;

    updateResults();
    setInterval(updateResults, 3000);
}

function getVoteCounts() {
    const votes = JSON.parse(localStorage.getItem('votes')) || [];
    return candidates.map(candidate => ({
        ...candidate,
        votes: votes.filter(vote => vote.candidateId === candidate.id).length
    }));
}

function calculatePercentages(voteCounts) {
    const totalVotes = voteCounts.reduce((sum, candidate) => sum + candidate.votes, 0);
    return voteCounts.map(candidate => ({
        ...candidate,
        percentage: totalVotes === 0 ? 0 : ((candidate.votes / totalVotes) * 100).toFixed(1)
    }));
}

function updateResults() {
    const voteCounts = getVoteCounts();
    const resultsWithPercentages = calculatePercentages(voteCounts);
    const totalVotes = voteCounts.reduce((sum, c) => sum + c.votes, 0);

    updateChart(resultsWithPercentages);
    updateDetailedResults(resultsWithPercentages);
    updateTotalVotes(totalVotes);
    updateLastUpdateTime();
}

function updateChart(voteCounts) {
    const ctx = document.getElementById('resultsChart');
    if (!ctx) return;

    const chartData = {
        labels: voteCounts.map(c => c.name),
        datasets: [{
            label: 'Votes',
            data: voteCounts.map(c => c.votes),
            backgroundColor: [
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 99, 132, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(255, 159, 64, 0.8)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    if (resultsChart) {
        resultsChart.data = chartData;
        resultsChart.update();
    } else {
        resultsChart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { stepSize: 1 }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }
}

// ==============================================
// Admin Page Logic (admin.html)
// ==============================================

function initAdminPage() {
    if (!window.location.pathname.includes('admin.html')) return;

    checkAdminLogin();
    setupAdminEventListeners();
}

function setupAdminEventListeners() {
    const loginForm = document.getElementById('adminLoginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const resetBtn = document.getElementById('resetVotingBtn');
    const confirmResetBtn = document.getElementById('confirmResetBtn');
    const cancelResetBtn = document.getElementById('cancelResetBtn');

    if (loginForm) loginForm.addEventListener('submit', handleAdminLogin);
    if (logoutBtn) logoutBtn.addEventListener('click', handleAdminLogout);
    if (resetBtn) resetBtn.addEventListener('click', handleVotingReset);
    if (confirmResetBtn) confirmResetBtn.addEventListener('click', confirmVotingReset);
    if (cancelResetBtn) cancelResetBtn.addEventListener('click', cancelVotingReset);
}

function checkAdminLogin() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    const adminLogin = document.getElementById('adminLogin');
    const adminDashboard = document.getElementById('adminDashboard');

    if (adminLogin && adminDashboard) {
        adminLogin.style.display = isLoggedIn ? 'none' : 'block';
        adminDashboard.style.display = isLoggedIn ? 'block' : 'none';
        if (isLoggedIn) updateAdminDashboard();
    }
}

function handleAdminLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username')?.value;
    const password = document.getElementById('password')?.value;

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        hideError('loginError');
        checkAdminLogin();
    } else {
        showError('loginError', 'Invalid username or password');
        sessionStorage.removeItem('adminLoggedIn');
    }
}

function handleAdminLogout() {
    sessionStorage.removeItem('adminLoggedIn');
    window.location.reload();
}

function updateAdminDashboard() {
    const voteCounts = getVoteCounts();
    const totalVotes = voteCounts.reduce((sum, c) => sum + c.votes, 0);
    const uniqueVoters = new Set(JSON.parse(localStorage.getItem('votes') || '[]')
        .map(vote => vote.voterId)).size;

    updateDashboardStats(totalVotes, uniqueVoters);
    updateCandidateStats(voteCounts);
}

function updateDashboardStats(totalVotes, uniqueVoters) {
    const totalVotesElement = document.getElementById('totalVotes');
    const uniqueVotersElement = document.getElementById('uniqueVoters');

    if (totalVotesElement) totalVotesElement.textContent = totalVotes;
    if (uniqueVotersElement) uniqueVotersElement.textContent = uniqueVoters;
}

function handleVotingReset() {
    const modal = document.getElementById('resetConfirmModal');
    if (modal) modal.style.display = 'flex';
}

function confirmVotingReset() {
    localStorage.removeItem('votes');
    localStorage.removeItem('hasVoted');
    
    const modal = document.getElementById('resetConfirmModal');
    const successMessage = document.getElementById('resetSuccess');
    
    if (modal) modal.style.display = 'none';
    if (successMessage) {
        successMessage.style.display = 'block';
        setTimeout(() => successMessage.style.display = 'none', 3000);
    }

    updateAdminDashboard();
}

function cancelVotingReset() {
    const modal = document.getElementById('resetConfirmModal');
    if (modal) modal.style.display = 'none';
}

// ==============================================
// Initialize based on current page
// ==============================================

document.addEventListener('DOMContentLoaded', () => {
    initLoginPage();
    initVotingPage();
    initResultsPage();
    initAdminPage();
}); 