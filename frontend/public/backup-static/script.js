/**
 * Central Vista Farms - Landing Page JavaScript
 * Handles form submission, animations, and interactivity
 */

// Get backend URL from environment or use default
const BACKEND_URL = window.location.origin;
const API_URL = `${BACKEND_URL}/api`;

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all elements with scroll-animate class
    document.querySelectorAll('.scroll-animate').forEach((el) => {
        observer.observe(el);
    });
}

// ===== STICKY CTA BAR =====
function initStickyCTA() {
    const stickyBar = document.getElementById('sticky-mobile-cta');
    
    if (!stickyBar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            stickyBar.classList.add('show');
        } else {
            stickyBar.classList.remove('show');
        }
    }, { passive: true });
}

// ===== SMOOTH SCROLL TO FORM =====
function scrollToForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    }
}

// ===== FORM VALIDATION =====
function validateForm(formData) {
    const errors = {};
    
    // Name validation
    if (!formData.name.trim()) {
        errors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
        errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
        errors.phone = 'Phone number is required';
    }
    
    return errors;
}

// ===== DISPLAY FORM ERRORS =====
function displayFormErrors(errors) {
    // Clear previous errors
    document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
    document.querySelectorAll('.form-input').forEach(el => el.classList.remove('error'));
    
    // Display new errors
    Object.keys(errors).forEach(field => {
        const errorElement = document.getElementById(`${field}-error`);
        const inputElement = document.getElementById(field);
        
        if (errorElement) {
            errorElement.textContent = errors[field];
        }
        if (inputElement) {
            inputElement.classList.add('error');
        }
    });
}

// ===== SHOW TOAST NOTIFICATION =====
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== FORM SUBMISSION =====
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    
    // Get form data
    const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        company: form.message?.value || 'Farmland Inquiry'
    };
    
    // Validate form
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
        displayFormErrors(errors);
        showToast('Please fill in all required fields correctly', 'error');
        return;
    }
    
    // Clear errors
    displayFormErrors({});
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'flex';
    
    try {
        const response = await fetch(`${API_URL}/leads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to submit form');
        }
        
        const data = await response.json();
        
        // Show success message
        showToast('Thank you! We\'ll be in touch within 24 hours.', 'success');
        
        // Reset form
        form.reset();
        
    } catch (error) {
        console.error('Form submission error:', error);
        showToast('Something went wrong. Please try again.', 'error');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'flex';
        btnLoader.style.display = 'none';
    }
}

// ===== CLEAR FIELD ERROR ON INPUT =====
function initFieldErrorClear() {
    const inputs = document.querySelectorAll('.form-input');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const errorElement = document.getElementById(`${this.name}-error`);
            if (errorElement) {
                errorElement.textContent = '';
            }
            this.classList.remove('error');
        });
    });
}

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize sticky CTA
    initStickyCTA();
    
    // Initialize field error clearing
    initFieldErrorClear();
    
    // Log initialization
    console.log('Central Vista Farms - Landing Page Initialized');
});

// ===== EXPOSE GLOBAL FUNCTIONS =====
window.scrollToForm = scrollToForm;
window.handleFormSubmit = handleFormSubmit;
