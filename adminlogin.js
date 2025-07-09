document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:5000';

    const adminForm = document.getElementById('adminLoginForm');
    const adminIdInput = document.getElementById('adminId');
    const passwordInput = document.getElementById('adminPassword');
    const captchaInput = document.getElementById('captchaInput');
    const captchaImage = document.getElementById('captchaImage');
    const refreshCaptcha = document.getElementById('refreshCaptcha');

    const adminIdError = document.getElementById('adminIdError');
    const adminPasswordError = document.getElementById('adminPasswordError');
    const captchaError = document.getElementById('captchaError');

    const MOCK_ID = 'admin123';
    const MOCK_PASS = 'Secure@456';

    // Load captcha initially
    loadCaptcha();

    // Refresh CAPTCHA button
    refreshCaptcha.addEventListener('click', loadCaptcha);

    function loadCaptcha() {
        fetch(`${API_URL}/captcha`, {
            credentials: 'include'
        })
        .then(res => res.blob())
        .then(blob => {
            captchaImage.src = URL.createObjectURL(blob);
            captchaInput.value = '';
            captchaError.textContent = '';
        })
        .catch(() => {
            captchaError.textContent = 'Failed to load CAPTCHA';
        });
    }

    adminForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const adminId = adminIdInput.value.trim();
        const adminPassword = passwordInput.value.trim();
        const captcha = captchaInput.value.trim();

        // Reset errors
        adminIdError.textContent = '';
        adminPasswordError.textContent = '';
        captchaError.textContent = '';

        if (!adminId) {
            adminIdError.textContent = 'Please enter Admin ID';
            return;
        }

        if (!adminPassword) {
            adminPasswordError.textContent = 'Please enter Password';
            return;
        }

        if (!captcha) {
            captchaError.textContent = 'Please enter CAPTCHA';
            return;
        }

        // Mock check
        if (adminId === MOCK_ID && adminPassword === MOCK_PASS) {
            alert('Login successful!');
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid Admin ID or Password');
        }
    });
});
