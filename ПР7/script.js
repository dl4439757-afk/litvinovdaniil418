document.addEventListener('DOMContentLoaded', function() {
var form = document.getElementById('registrationForm');
if (!form) return;
var inputs = form.querySelectorAll('input, select, textarea');
inputs.forEach(function(input) {
input.addEventListener('blur', validateField);
input.addEventListener('input', clearError);
});
var password = document.getElementById('password');
var confirmPassword = document.getElementById('confirmPassword');
if (confirmPassword) confirmPassword.addEventListener('input', validatePasswordMatch);
form.addEventListener('submit', function(e) {
e.preventDefault();
var isValid = true;
inputs.forEach(function(input) { if (!validateField({target: input})) isValid = false; });
if (!validatePasswordMatch()) isValid = false;
if (isValid) alert('Форма успешно отправлена!');
else alert('Пожалуйста, исправьте ошибки');
});
function validateField(e) {
var field = e.target;
if (!field.required && !field.value.trim()) { clearErrorForField(field); return true; }
if (!field.checkValidity()) { showErrorForField(field, getErrorMessage(field)); return false; }
clearErrorForField(field); return true;
}
function validatePasswordMatch() {
if (!password || !confirmPassword) return true;
if (confirmPassword.value && password.value !== confirmPassword.value) {
showErrorForField(confirmPassword, 'Пароли не совпадают'); return false;
}
clearErrorForField(confirmPassword); return true;
}
function getErrorMessage(field) {
if (field.validity.valueMissing) return 'Поле обязательно';
if (field.validity.typeMismatch) return 'Некорректный формат';
if (field.validity.tooShort) return 'Минимум ' + field.minLength + ' символов';
if (field.validity.patternMismatch) return 'Не соответствует шаблону';
return 'Некорректное значение';
}
function showErrorForField(field, message) {
field.classList.add('error');
var el = document.getElementById(field.id + 'Error');
if (el) el.textContent = message;
}
function clearErrorForField(field) {
field.classList.remove('error');
var el = document.getElementById(field.id + 'Error');
if (el) el.textContent = '';
}
function clearError(e) { clearErrorForField(e.target); }
});
