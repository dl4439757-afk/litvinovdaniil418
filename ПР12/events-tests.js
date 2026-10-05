document.addEventListener('DOMContentLoaded', function() {
console.log('=== ТЕСТЫ СОБЫТИЙ ===');
let fired = false;
document.addEventListener('customAction', () => fired = true);
triggerCustomEvent();
setTimeout(() => console.log('CustomEvent:', fired ? 'OK' : 'FAIL'), 100);
});
