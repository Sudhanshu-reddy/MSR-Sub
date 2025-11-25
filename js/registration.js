// Registration form functionality
document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const accommodationCheckbox = document.getElementById('needAccommodation');
    const accommodationDetails = document.getElementById('accommodationDetails');
    const categorySelect = document.getElementById('category');
    const feeTypeSelect = document.getElementById('feeType');
    const calculatedFee = document.getElementById('calculatedFee');

    // Fee structure
    const fees = {
        'international-author': { early: 300, regular: 350, onsite: 400 },
        'indian-author': { early: 8000, regular: 9000, onsite: 10000 },
        'international-student': { early: 150, regular: 200, onsite: 250 },
        'indian-student': { early: 4000, regular: 5000, onsite: 6000 },
        'accompanying': { early: 100, regular: 150, onsite: 200 },
        'listener': { early: 50, regular: 75, onsite: 100 }
    };

    // Toggle accommodation details
    if (accommodationCheckbox && accommodationDetails) {
        accommodationCheckbox.addEventListener('change', () => {
            accommodationDetails.style.display = accommodationCheckbox.checked ? 'block' : 'none';
        });
    }

    // Calculate and display fee
    function updateFee() {
        if (categorySelect && feeTypeSelect && calculatedFee) {
            const category = categorySelect.value;
            const feeType = feeTypeSelect.value;

            if (category && feeType && fees[category]) {
                const fee = fees[category][feeType];
                const currency = category.includes('indian') ? '₹' : '$';
                calculatedFee.textContent = `${currency}${fee.toLocaleString()}`;
            } else {
                calculatedFee.textContent = 'Fee will be calculated after form submission';
            }
        }
    }

    // Update fee when category or fee type changes
    if (categorySelect) {
        categorySelect.addEventListener('change', updateFee);
    }
    if (feeTypeSelect) {
        feeTypeSelect.addEventListener('change', updateFee);
    }

    // Form submission
    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(registrationForm);
            const data = Object.fromEntries(formData);

            // Basic validation
            const requiredFields = ['title', 'firstName', 'lastName', 'email', 'phone', 'organization', 'country', 'category', 'feeType'];
            let isValid = true;

            requiredFields.forEach(field => {
                if (!data[field]) {
                    alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`);
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

            // Phone validation
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
                alert('Please enter a valid phone number');
                return;
            }

            // Simulate form submission
            alert('Thank you for your registration! We will send you a confirmation email shortly with payment instructions.');

            // Reset form
            registrationForm.reset();
            if (accommodationDetails) {
                accommodationDetails.style.display = 'none';
            }
            updateFee();
        });
    }

    // Initialize fee display
    updateFee();

    // Add dynamic validation
    const inputs = registrationForm ? registrationForm.querySelectorAll('input, select, textarea') : [];
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && !input.value) {
                input.style.borderColor = '#e74c3c';
            } else {
                input.style.borderColor = '#27ae60';
            }
        });

        input.addEventListener('focus', () => {
            input.style.borderColor = '#3498db';
        });
    });

    // Auto-fill country based on selection (optional enhancement)
    const countrySelect = document.getElementById('country');
    if (countrySelect) {
        // Add popular countries
        const popularCountries = [
            'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
            'Germany', 'France', 'Japan', 'China', 'Singapore'
        ];

        countrySelect.innerHTML = '<option value="">Select Country</option>';
        popularCountries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            countrySelect.appendChild(option);
        });
    }

    // Paper submission toggle
    const paperTitle = document.getElementById('paperTitle');
    const paperInputs = ['paperTitle', 'authors', 'abstract'];

    if (paperTitle) {
        paperInputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', () => {
                    const hasPaperData = paperInputs.some(id => {
                        const el = document.getElementById(id);
                        return el && el.value.trim() !== '';
                    });

                    // Optional: Add visual indicator for paper submission
                    const formSection = input.closest('.form-section');
                    if (formSection) {
                        if (hasPaperData) {
                            formSection.style.borderLeft = '4px solid #27ae60';
                        } else {
                            formSection.style.borderLeft = 'none';
                        }
                    }
                });
            }
        });
    }

    // Terms and conditions modal (optional enhancement)
    const termsLink = document.querySelector('.terms-conditions a[href="#"]');
    if (termsLink) {
        termsLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Terms and Conditions:\n\n1. All fees are non-refundable after 30 days of registration.\n2. Conference materials will be provided digitally.\n3. Participants must follow the conference code of conduct.\n4. Intellectual property rights remain with the authors.\n5. The organizing committee reserves the right to modify the program.');
        });
    }

    // Newsletter subscription
    const newsletterCheckbox = document.getElementById('contactNewsletter');
    if (newsletterCheckbox) {
        newsletterCheckbox.addEventListener('change', () => {
            if (newsletterCheckbox.checked) {
                // Optional: Show additional newsletter preferences
                console.log('User subscribed to newsletter');
            }
        });
    }

    // Real-time fee calculation with currency conversion (optional)
    function formatCurrency(amount, currency) {
        if (currency === '₹') {
            return `₹${amount.toLocaleString('en-IN')}`;
        } else {
            return `$${amount.toLocaleString('en-US')}`;
        }
    }

    // Enhanced fee display
    function updateFeeDisplay() {
        if (categorySelect && feeTypeSelect && calculatedFee) {
            const category = categorySelect.value;
            const feeType = feeTypeSelect.value;

            if (category && feeType && fees[category]) {
                const fee = fees[category][feeType];
                const currency = category.includes('indian') ? '₹' : '$';
                const formattedFee = formatCurrency(fee, currency);

                calculatedFee.innerHTML = `
                    <strong>${formattedFee}</strong>
                    <br>
                    <small style="color: #666;">${feeType.replace('-', ' ').toUpperCase()} registration fee</small>
                `;
            } else {
                calculatedFee.innerHTML = '<em>Fee will be calculated after selecting category and fee type</em>';
            }
        }
    }

    // Use enhanced fee display
    if (categorySelect) {
        categorySelect.addEventListener('change', updateFeeDisplay);
    }
    if (feeTypeSelect) {
        feeTypeSelect.addEventListener('change', updateFeeDisplay);
    }

    // Initialize enhanced fee display
    updateFeeDisplay();
});