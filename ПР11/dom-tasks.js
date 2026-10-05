function createCard(t, c) {
const target = document.getElementById('target1'); if (!target) return;
const card = document.createElement('div'); card.className = 'card';
const h4 = document.createElement('h4'); h4.textContent = t;
const p = document.createElement('p'); p.textContent = c;
card.appendChild(h4); card.appendChild(p); target.appendChild(card);
}
function createList(items) {
const target = document.getElementById('target1'); if (!target) return;
const ol = document.createElement('ol');
items.forEach(i => { const li = document.createElement('li'); li.textContent = i; ol.appendChild(li); });
target.appendChild(ol);
}
function countChildren() { const p = document.getElementById('parent-element'); return p ? p.children.length : 0; }
function findSpecialChild() { const p = document.getElementById('parent-element'); if (!p) return null; const s = p.querySelector('.special'); return s ? s.textContent : null; }
function getParentBackground() { const c = document.querySelector('.child'); return c ? getComputedStyle(c.parentElement).backgroundColor : null; }
function setupStyleToggle() {
const btn = document.getElementById('toggle-style'), t = document.getElementById('style-target');
if (btn && t) btn.addEventListener('click', () => t.classList.toggle('active-style'));
}
function setupClickCounter() {
const btn = document.getElementById('click-btn'), c = document.getElementById('click-counter');
if (!btn || !c) return;
let n = 0; btn.addEventListener('click', () => { n++; c.textContent = 'Кликов: ' + n; });
}
function setupInputDisplay() {
const i = document.getElementById('text-input'), d = document.getElementById('input-display');
if (i && d) i.addEventListener('input', () => d.textContent = i.value);
}
function setupKeyboardEvents() { document.addEventListener('keydown', e => console.log('Key:', e.code, e.key)); }
function addListItem() {
const i = document.getElementById('item-input'), l = document.getElementById('dynamic-list');
if (!i || !l || !i.value.trim()) return;
const li = document.createElement('li'); li.className = 'list-item';
const s = document.createElement('span'); s.textContent = i.value;
const d = document.createElement('button'); d.textContent = 'X'; d.className = 'delete-btn';
li.appendChild(s); li.appendChild(d); l.appendChild(li); i.value = '';
}
function removeListItem(e) { if (e.target.classList.contains('delete-btn')) e.target.parentElement.remove(); }
function clearList() { const l = document.getElementById('dynamic-list'); if (l) l.innerHTML = ''; }
function setupListEvents() {
const a = document.getElementById('add-item'), c = document.getElementById('clear-list'), l = document.getElementById('dynamic-list');
if (a) a.addEventListener('click', addListItem);
if (c) c.addEventListener('click', clearList);
if (l) l.addEventListener('click', removeListItem);
}
function validateForm(fd) {
const err = {};
const n = fd.get('user-name'), e = fd.get('user-email'), a = fd.get('user-age');
if (!n || n.trim().length < 2) err.name = 'Имя минимум 2 символа';
if (!e || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) err.email = 'Некорректный email';
const an = parseInt(a);
if (!a || isNaN(an) || an < 1 || an > 120) err.age = 'Возраст 1-120';
return err;
}
function displayFormErrors(errors) {
const o = document.getElementById('form-output'); if (!o) return;
o.innerHTML = '';
Object.values(errors).forEach(e => { const d = document.createElement('div'); d.className = 'error-message'; d.textContent = e; o.appendChild(d); });
}
function displayFormSuccess(d) {
const o = document.getElementById('form-output'); if (!o) return;
o.innerHTML = '<div class="success-message"><h3>Успех!</h3><p>' + d.name + ' / ' + d.email + '</p></div>';
}
function handleFormSubmit(e) {
e.preventDefault();
const fd = new FormData(e.target);
const err = validateForm(fd);
if (Object.keys(err).length > 0) displayFormErrors(err);
else { displayFormSuccess({name: fd.get('user-name'), email: fd.get('user-email'), age: fd.get('user-age')}); e.target.reset(); }
}
function setupForm() { const f = document.getElementById('user-form'); if (f) f.addEventListener('submit', handleFormSubmit); }
function initializeApp() {
setupStyleToggle(); setupClickCounter(); setupInputDisplay(); setupKeyboardEvents();
setupListEvents(); setupForm();
createCard('Пример', 'Содержимое'); createList(['Первый', 'Второй', 'Третий']);
console.log('Приложение инициализировано');
}
document.addEventListener('DOMContentLoaded', initializeApp);
