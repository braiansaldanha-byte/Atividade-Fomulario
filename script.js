        let formData = {};

        function saveFormData() {
            const data = new FormData(document.getElementById('userRegistrationForm'));
            formData.fullName = data.get('fullName') || '';
            formData.email = data.get('email') || '';
            formData.gender = data.get('gender') || '';
            formData.country = data.get('country') || '';
            formData.interests = data.getAll('interests') || [];
        
        localStorage.setItem('userFormData', JSON.stringify(formData));
}

      function loadFormData() {
    const savedData = localStorage.getItem('userFormData');
    if (savedData) {
        formData = JSON.parse(savedData);

        document.getElementById('fullName').value = formData.fullName || '';
        document.getElementById('email').value = formData.email || '';
        document.getElementById('country').value = formData.country || '';

        if (formData.gender) {
            const genderRadio = document.querySelector(`input[name="gender"][value="${formData.gender}"]`);
            if (genderRadio) {
                genderRadio.checked = true;
            }
        }

        if (formData.interests && formData.interests.length > 0) {
            formData.interests.forEach(interest => {
                const checkbox = document.querySelector(`input[name="interests"][value="${interest}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        }

        document.getElementById('successMessage').style.display = 'block';
    }
}


        function validatePasswords() {
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const errorElement = document.getElementById('confirmPasswordError');
            
            if (confirmPassword && password !== confirmPassword) {
                errorElement.textContent = 'As senhas não coincidem';
                errorElement.style.display = 'block';
                document.getElementById('confirmPassword').style.borderColor = '#d93025';
                return false;
            } else {
                errorElement.style.display = 'none';
                document.getElementById('confirmPassword').style.borderColor = '#dadce0';
                return true;
            }
        }

        function validateForm() {
            let isValid = true;
            
            const fullName = document.getElementById('fullName').value.trim();
            if (fullName.length < 2) {
                document.getElementById('fullNameError').textContent = 'Nome deve ter pelo menos 2 caracteres';
                document.getElementById('fullNameError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('fullNameError').style.display = 'none';
            }
            
            const email = document.getElementById('email').value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                document.getElementById('emailError').textContent = 'Por favor, insira um email válido';
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('emailError').style.display = 'none';
            }
            
            const password = document.getElementById('password').value;
            if (password.length < 8) {
                document.getElementById('passwordError').textContent = 'A senha deve ter pelo menos 8 caracteres';
                document.getElementById('passwordError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('passwordError').style.display = 'none';
            }
            
            if (!validatePasswords()) {
                isValid = false;
            }
            
            return isValid;
        }

        function clearForm() {
            document.getElementById('userRegistrationForm').reset();
            formData = {};
            document.getElementById('successMessage').style.display = 'none';
            
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(error => {
                error.style.display = 'none';
            });
            
            const inputs = document.querySelectorAll('.form-input');
            inputs.forEach(input => {
                input.style.borderColor = '#dadce0';
            });
        }

        document.addEventListener('DOMContentLoaded', function() {
            loadFormData();
            
            document.getElementById('confirmPassword').addEventListener('input', validatePasswords);
            document.getElementById('password').addEventListener('input', function() {
                const confirmPassword = document.getElementById('confirmPassword').value;
                if (confirmPassword) {
                    validatePasswords();
                }
            });
            
            const inputs = document.querySelectorAll('input, select');
            inputs.forEach(input => {
                let timeout;
                input.addEventListener('input', function() {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        if (input.type !== 'password' && input.type !== 'file') {
                            saveFormData();
                        }
                    }, 500);
                });
                
                input.addEventListener('change', function() {
                    if (input.type !== 'password' && input.type !== 'file') {
                        saveFormData();
                    }
                });
            });
            
            document.getElementById('userRegistrationForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (validateForm()) {
                    saveFormData();
                    
                    const submitBtn = document.getElementById('submitBtn');
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Enviando...';
                    
                    setTimeout(() => {
                        alert('Formulário enviado com sucesso!\n\nDados que seriam enviados para /submit_form:\n' + 
                              JSON.stringify(formData, null, 2));
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Cadastrar';
                    }, 1500);
                } else {
                    alert('Por favor, corrija os erros no formulário antes de continuar.');
                }
            });
        });

