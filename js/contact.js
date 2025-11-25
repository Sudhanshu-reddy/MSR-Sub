// Contact form functionality
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Validation
            const requiredFields = ['name', 'email', 'subject', 'message'];
            let isValid = true;

            requiredFields.forEach(field => {
                if (!data[field]) {
                    alert(`Please fill in the ${field} field`);
                    isValid = false;
                }
            });

            if (!isValid) return;

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Phone validation (if provided)
            if (data.phone) {
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                if (!phoneRegex.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
                    alert('Please enter a valid phone number');
                    return;
                }
            }

            // Simulate form submission
            alert('Thank you for your message! We will get back to you within 24 hours.');

            // Reset form
            contactForm.reset();

            // Log newsletter subscription
            if (data.newsletter) {
                console.log('User subscribed to newsletter');
            }
        });
    }

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');

        if (question && answer) {
            // Initially hide answers
            answer.style.display = 'none';

            question.style.cursor = 'pointer';
            question.style.userSelect = 'none';

            question.addEventListener('click', () => {
                const isVisible = answer.style.display === 'block';
                answer.style.display = isVisible ? 'none' : 'block';

                // Add visual indicator
                question.style.color = isVisible ? '#2c3e50' : '#3498db';
            });

            // Add hover effect
            question.addEventListener('mouseenter', () => {
                question.style.color = '#3498db';
            });

            question.addEventListener('mouseleave', () => {
                if (answer.style.display !== 'block') {
                    question.style.color = '#2c3e50';
                }
            });
        }
    });

    // Emergency contact quick dial (for mobile)
    const emergencyCards = document.querySelectorAll('.emergency-card');

    emergencyCards.forEach(card => {
        const phoneLink = card.querySelector('p');
        if (phoneLink && phoneLink.textContent.includes('\n')) {
            const phoneNumbers = phoneLink.textContent.split('\n').filter(num => num.trim());
            phoneLink.innerHTML = phoneNumbers.map(num =>
                `<a href="tel:${num.trim()}" style="color: #e74c3c; text-decoration: none;">${num.trim()}</a>`
            ).join('<br>');
        }
    });

    // Contact card hover effects
    const contactCards = document.querySelectorAll('.contact-card');

    contactCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
            card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });

    // Map interaction (placeholder for future enhancement)
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        mapContainer.addEventListener('click', () => {
            // Could open Google Maps in new tab
            const address = encodeURIComponent('Anjuman Institute of Technology and Management, Bhatkal, Karnataka');
            window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
        });

        mapContainer.style.cursor = 'pointer';
        mapContainer.title = 'Click to open in Google Maps';
    }

    // Subject-based form enhancement
    const subjectSelect = document.getElementById('contactSubject');
    const messageTextarea = document.getElementById('contactMessage');

    if (subjectSelect && messageTextarea) {
        subjectSelect.addEventListener('change', () => {
            const subject = subjectSelect.value;
            let placeholder = 'Please provide details about your inquiry...';

            switch (subject) {
                case 'registration':
                    placeholder = 'Please provide your registration ID or details about your registration inquiry...';
                    break;
                case 'paper':
                    placeholder = 'Please provide your paper ID, title, or details about your paper submission inquiry...';
                    break;
                case 'program':
                    placeholder = 'Please specify which aspect of the program you have questions about...';
                    break;
                case 'accommodation':
                    placeholder = 'Please provide details about your accommodation requirements or inquiries...';
                    break;
                case 'technical':
                    placeholder = 'Please describe the technical issue you are experiencing...';
                    break;
            }

            messageTextarea.placeholder = placeholder;
        });
    }

    // Auto-resize textarea
    if (messageTextarea) {
        messageTextarea.addEventListener('input', () => {
            messageTextarea.style.height = 'auto';
            messageTextarea.style.height = messageTextarea.scrollHeight + 'px';
        });
    }

    // Office hours indicator
    function updateOfficeHours() {
        const now = new Date();
        const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const hour = now.getHours();
        const minute = now.getMinutes();
        const currentTime = hour * 60 + minute;

        let isOpen = false;
        let status = 'Closed';

        // Monday to Friday: 9:00 AM - 6:00 PM
        if (day >= 1 && day <= 5) {
            const openTime = 9 * 60; // 9:00 AM
            const closeTime = 18 * 60; // 6:00 PM
            isOpen = currentTime >= openTime && currentTime < closeTime;
            status = isOpen ? 'Open' : 'Closed';
        }
        // Saturday: 9:00 AM - 2:00 PM
        else if (day === 6) {
            const openTime = 9 * 60; // 9:00 AM
            const closeTime = 14 * 60; // 2:00 PM
            isOpen = currentTime >= openTime && currentTime < closeTime;
            status = isOpen ? 'Open' : 'Closed';
        }

        // Update office hours display
        const officeHoursCard = document.querySelector('.contact-card h3:contains("Office Hours")');
        if (officeHoursCard) {
            const statusElement = document.createElement('span');
            statusElement.textContent = ` (${status})`;
            statusElement.style.color = isOpen ? '#27ae60' : '#e74c3c';
            statusElement.style.fontWeight = 'bold';

            // Remove existing status if any
            const existingStatus = officeHoursCard.querySelector('span');
            if (existingStatus) {
                existingStatus.remove();
            }

            officeHoursCard.appendChild(statusElement);
        }
    }

    // Update office hours on page load
    updateOfficeHours();

    // Update office hours every minute
    setInterval(updateOfficeHours, 60000);

    // Social media links enhancement
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Add tracking or validation if needed
            console.log(`Social link clicked: ${link.href}`);
        });
    });

    // Newsletter subscription with local storage
    const newsletterCheckbox = document.getElementById('contactNewsletter');
    if (newsletterCheckbox) {
        // Check if user already subscribed
        const hasSubscribed = localStorage.getItem('dmcmics_newsletter');
        if (hasSubscribed) {
            newsletterCheckbox.checked = true;
        }

        newsletterCheckbox.addEventListener('change', () => {
            if (newsletterCheckbox.checked) {
                localStorage.setItem('dmcmics_newsletter', 'true');
                console.log('User subscribed to newsletter');
            } else {
                localStorage.removeItem('dmcmics_newsletter');
                console.log('User unsubscribed from newsletter');
            }
        });
    }

    // Add loading state to form submission
    const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;
    if (submitButton && contactForm) {
        contactForm.addEventListener('submit', () => {
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;

            // Reset after simulated submission
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
});