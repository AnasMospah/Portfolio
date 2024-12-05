
const toggleMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const overlay = document.querySelector('.overlay');
    
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    hamburgerMenu.style.display = navLinks.classList.contains('active') ? 'none' : 'flex';
};


document.querySelector('.close-btn').addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const overlay = document.querySelector('.overlay');
    
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    hamburgerMenu.style.display = 'flex';
});

document.querySelector('.overlay').addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const overlay = document.querySelector('.overlay');
    
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    hamburgerMenu.style.display = 'flex';
});


const handleFormSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);

    
    const updateButtonState = (state) => {
        const states = {
            loading: {
                text: 'Sending...',
                disabled: true,
                style: {
                    opacity: '0.7',
                    animation: 'none',
                    backgroundColor: '',
                    borderColor: '',
                    color: ''
                }
            },
            success: {
                text: 'Successful',
                style: {
                    backgroundColor: '#4ade80',
                    borderColor: '#4ade80',
                    color: 'black',
                    animation: 'glowGreen 1s infinite'
                }
            },
            error: {
                text: 'Try Again',
                style: {
                    backgroundColor: '#ef4444',
                    borderColor: '#ef4444',
                    color: 'black',
                    animation: 'glowRed 1s infinite'
                }
            },
            default: {
                text: 'Send Message',
                disabled: false,
                style: {
                    opacity: '1',
                    animation: 'none',
                    backgroundColor: '',
                    borderColor: '',
                    color: ''
                }
            }
        };

        const currentState = states[state];
        submitBtn.textContent = currentState.text;
        submitBtn.disabled = currentState.disabled ?? false;
        Object.assign(submitBtn.style, currentState.style);
    };

    updateButtonState('loading');

    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data?.success) {
            updateButtonState('success');
            form.reset();
        } else {
            throw new Error('Submission failed');
        }
    })
    .catch(error => {
        console.error('Form submission error:', error);
        updateButtonState('error');
    })
    .finally(() => {
        setTimeout(() => updateButtonState('default'), 3000);
    });
};