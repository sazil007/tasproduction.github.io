let isLoggedIn = false;
let currentUser = null;
let users = JSON.parse(localStorage.getItem('users')) || [];

function initAuth() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        isLoggedIn = true;
    }
    updateAuthUI();
}

function updateAuthUI() {
    const authSection = document.getElementById('authSection');
    if (isLoggedIn && currentUser) {
        authSection.innerHTML = `<div class="user-info"><div class="user-avatar">${currentUser.name.charAt(0).toUpperCase()}</div><span>Welcome, ${currentUser.name}</span><button class="btn-logout" onclick="logout()">Logout</button></div>`;
    } else {
        authSection.innerHTML = `<div class="auth-buttons"><button class="btn-login" onclick="showLoginModal()">Login</button><button class="btn-signup" onclick="showSignupModal()">Sign Up</button></div>`;
    }
}

function toggleMobileMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerOffset = 80;
        const elementPosition = section.offsetTop;
        const offsetPosition = elementPosition - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        document.querySelector('.nav-links')?.classList.remove('active');
    }
}

function scrollToService(serviceId) {
    const element = document.getElementById(serviceId);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        document.querySelector('.nav-links')?.classList.remove('active');
    }
}

function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
    document.getElementById('loginError').style.display = 'none';
    document.getElementById('loginForm').reset();
}

function showSignupModal() {
    document.getElementById('signupModal').style.display = 'block';
    document.getElementById('signupError').style.display = 'none';
    document.getElementById('signupSuccess').style.display = 'none';
    document.getElementById('signupForm').reset();
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function switchToSignup() {
    closeModal('loginModal');
    showSignupModal();
}

function switchToLogin() {
    closeModal('signupModal');
    showLoginModal();
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        isLoggedIn = true;
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateAuthUI();
        closeModal('loginModal');
        alert('Login successful! Welcome back.');
    } else {
        const errorDiv = document.getElementById('loginError');
        errorDiv.textContent = 'Invalid email or password. Please try again.';
        errorDiv.style.display = 'block';
    }
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    if (password.length < 6) {
        document.getElementById('signupError').textContent = 'Password must be at least 6 characters long.';
        document.getElementById('signupError').style.display = 'block';
        return;
    }
    
    if (password !== confirmPassword) {
        document.getElementById('signupError').textContent = 'Passwords do not match.';
        document.getElementById('signupError').style.display = 'block';
        return;
    }
    
    if (users.find(u => u.email === email)) {
        document.getElementById('signupError').textContent = 'Email already registered. Please login instead.';
        document.getElementById('signupError').style.display = 'block';
        return;
    }
    
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    document.getElementById('signupSuccess').textContent = 'Account created successfully! Please login.';
    document.getElementById('signupSuccess').style.display = 'block';
    
    setTimeout(() => {
        closeModal('signupModal');
        showLoginModal();
    }, 2000);
});

function logout() {
    isLoggedIn = false;
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    alert('You have been logged out successfully.');
}

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!isLoggedIn) {
        alert('Please login to send messages.');
        showLoginModal();
        return;
    }
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;
    
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    alert(`Thank you ${name}! Your message has been sent. We'll get back to you soon.`);
    this.reset();
});

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

if (window.innerWidth <= 768) {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });
    });
}

initAuth();