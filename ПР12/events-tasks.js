function handleBasicClick(e) {
const o = document.getElementById('basic-output');
o.innerHTML = 'Тип: ' + e.type + '<br>X: ' + e.clientX + ', Y: ' + e.clientY;
e.target.classList.add('pulse');
setTimeout(() => e.target.classList.remove('pulse'), 500);
}
function handleMouseEvents(e) {
const b = document.getElementById('color-box'), o = document.getElementById('mouse-output');
if (e.type === 'mouseenter') b.style.background = '#e74c3c';
if (e.type === 'mouseleave') b.style.background = '#3498db';
if (e.type === 'mousemove') o.textContent = 'X: ' + e.offsetX + ', Y: ' + e.offsetY;
}
function setupBasicEvents() {
const b = document.getElementById('basic-btn'), box = document.getElementById('color-box');
if (b) b.addEventListener('click', handleBasicClick);
if (box) { box.addEventListener('mouseenter', handleMouseEvents); box.addEventListener('mouseleave', handleMouseEvents); box.addEventListener('mousemove', handleMouseEvents); }
}
function handleKeyEvents(e) {
const o = document.getElementById('key-output');
o.innerHTML = 'Key: ' + e.key + '<br>Code: ' + e.code + '<br>Ctrl: ' + e.ctrlKey + ' Alt: ' + e.altKey + ' Shift: ' + e.shiftKey;
if (e.ctrlKey && e.key === 's') { e.preventDefault(); o.innerHTML += '<br><strong>Ctrl+S отменён</strong>'; }
if (e.altKey && e.key === 'c') { e.preventDefault(); o.innerHTML += '<br><strong>Alt+C отменён</strong>'; }
}
function setupKeyboardEvents() { const i = document.getElementById('key-input'); if (i) i.addEventListener('keydown', handleKeyEvents); }
function handleDelegationClick(e) {
const t = e.target, o = document.getElementById('delegation-output');
if (t.classList.contains('delete')) { t.parentElement.remove(); return; }
const item = t.closest('.item');
if (item) {
item.classList.toggle('selected');
const s = document.querySelectorAll('.item.selected');
o.textContent = 'Выбрано: ' + Array.from(s).map(el => el.dataset.id).join(', ');
}
}
function addNewItem() {
const l = document.getElementById('item-list');
const id = l.children.length + 1;
const d = document.createElement('div'); d.className = 'item'; d.dataset.id = id;
d.innerHTML = 'Элемент ' + id + ' <span class="delete">x</span>';
l.appendChild(d);
}
function setupDelegationEvents() {
const l = document.getElementById('item-list'), b = document.getElementById('add-item-btn');
if (l) l.addEventListener('click', handleDelegationClick);
if (b) b.addEventListener('click', addNewItem);
}
function preventLinkDefault(e) {
e.preventDefault();
const o = document.getElementById('prevention-output');
o.textContent = 'Переход отменён';
e.target.classList.add('shake');
setTimeout(() => e.target.classList.remove('shake'), 300);
}
function preventFormSubmit(e) {
e.preventDefault();
const o = document.getElementById('prevention-output'), i = document.getElementById('prevent-input');
if (!i.value.trim()) o.textContent = 'Поле пустое';
else { o.textContent = 'Отправлено: ' + i.value; i.value = ''; }
}
function setupPreventionEvents() {
const l = document.getElementById('prevent-link'), f = document.getElementById('prevent-form');
if (l) l.addEventListener('click', preventLinkDefault);
if (f) f.addEventListener('submit', preventFormSubmit);
}
function triggerCustomEvent() {
document.dispatchEvent(new CustomEvent('customAction', { detail: { message: 'Привет от кастомного события!' } }));
}
function handleCustomEvent(e) { const o = document.getElementById('custom-output'); o.textContent = 'Получено: ' + e.detail.message; }
function setupMultipleListeners() {
document.addEventListener('customAction', () => console.log('Слушатель 1'));
document.addEventListener('customAction', () => console.log('Слушатель 2'));
document.addEventListener('customAction', () => console.log('Слушатель 3'));
}
function setupCustomEvents() {
const b = document.getElementById('trigger-custom');
if (b) b.addEventListener('click', triggerCustomEvent);
document.addEventListener('customAction', handleCustomEvent);
}
function loadImageWithEvents() {
const c = document.getElementById('image-container'), o = document.getElementById('loading-output');
c.innerHTML = ''; o.textContent = 'Загрузка...';
const img = new Image();
img.onload = () => { c.appendChild(img); o.textContent = 'Успешно'; };
img.onerror = () => { o.textContent = 'Ошибка'; };
img.src = 'https://picsum.photos/200/300';
}
function simulateLoadError() {
const c = document.getElementById('image-container'), o = document.getElementById('loading-output');
c.innerHTML = ''; o.textContent = 'Загрузка...';
const img = new Image();
img.onerror = () => { o.textContent = 'Ошибка загрузки'; };
img.src = 'https://example.com/nonexistent.jpg';
}
function setupLoadingEvents() {
const l = document.getElementById('load-image'), e = document.getElementById('load-error');
if (l) l.addEventListener('click', loadImageWithEvents);
if (e) e.addEventListener('click', simulateLoadError);
}
let timerInterval, timerValue = 0;
function startTimer() {
if (timerInterval) return;
const o = document.getElementById('timer-output');
timerInterval = setInterval(() => { timerValue++; o.textContent = 'Таймер: ' + timerValue; }, 1000);
}
function stopTimer() {
clearInterval(timerInterval); timerInterval = null; timerValue = 0;
const o = document.getElementById('timer-output'); if (o) o.textContent = 'Таймер: 0';
}
function createDebounce(fn, delay) {
let tid;
return function(...args) { clearTimeout(tid); tid = setTimeout(() => fn.apply(this, args), delay); };
}
function createThrottle(fn, interval) {
let last = 0;
return function(...args) { const now = Date.now(); if (now - last >= interval) { last = now; fn.apply(this, args); } };
}
function testDebounce() {
const o = document.getElementById('async-output');
o.textContent = 'Debounce: ждём...';
createDebounce(() => o.textContent = 'Debounce: выполнено', 1000)();
}
function testThrottle() {
const o = document.getElementById('async-output');
o.textContent = 'Throttle: ждём...';
createThrottle(() => o.textContent = 'Throttle: выполнено', 1000)();
}
function setupTimerEvents() {
const s = document.getElementById('start-timer'), st = document.getElementById('stop-timer');
const d = document.getElementById('debounce-btn'), t = document.getElementById('throttle-btn');
if (s) s.addEventListener('click', startTimer);
if (st) st.addEventListener('click', stopTimer);
if (d) d.addEventListener('click', testDebounce);
if (t) t.addEventListener('click', testThrottle);
}
function initializeEventHandler() {
setupBasicEvents(); setupKeyboardEvents(); setupDelegationEvents(); setupPreventionEvents();
setupCustomEvents(); setupLoadingEvents(); setupTimerEvents(); setupMultipleListeners();
console.log('Все обработчики инициализированы');
}
document.addEventListener('DOMContentLoaded', initializeEventHandler);
