function createBasicPromise(resolve = true) {
return new Promise((res, rej) => {
setTimeout(() => resolve ? res('Успех!') : rej('Ошибка!'), 1000);
});
}
function displayOutput(id, data, isError = false) {
const o = document.getElementById(id); if (!o) return;
const c = typeof data === 'object' ? JSON.stringify(data, null, 2) : String(data);
o.innerHTML = '[' + new Date().toLocaleTimeString() + '] ' + c;
o.className = 'output ' + (isError ? 'error' : 'success');
}
function handleBasicPromise() {
createBasicPromise(true).then(r => displayOutput('promise-output', r)).catch(e => displayOutput('promise-output', e, true));
}
function createPromiseChain() {
displayOutput('promise-output', 'Старт...');
createBasicPromise(true)
.then(r => { displayOutput('promise-output', 'Шаг 1: ' + r); return new Promise(res => setTimeout(() => res('Шаг 2'), 500)); })
.then(r => { displayOutput('promise-output', 'Шаг 2: ' + r); return new Promise(res => setTimeout(() => res('Шаг 3'), 500)); })
.then(r => displayOutput('promise-output', 'Шаг 3: ' + r))
.catch(e => displayOutput('promise-output', e, true));
}
function handlePromiseError() {
createBasicPromise(false).then(r => displayOutput('promise-output', r)).catch(e => displayOutput('promise-output', 'Поймана: ' + e, true));
}
function setupPromiseEvents() {
const ids = ['basic-promise', 'promise-chain', 'promise-error'];
const fns = [handleBasicPromise, createPromiseChain, handlePromiseError];
ids.forEach((id, i) => { const b = document.getElementById(id); if (b) b.addEventListener('click', fns[i]); });
}
async function basicAsyncAwait() {
try { const r = await createBasicPromise(true); displayOutput('async-output', 'Async: ' + r); }
catch (e) { displayOutput('async-output', e, true); }
}
async function handleAsyncError() {
try { await createBasicPromise(false); } catch (e) { displayOutput('async-output', 'Поймана: ' + e, true); }
}
async function parallelAsyncExecution() {
const start = Date.now();
const results = await Promise.all([
createBasicPromise(true),
new Promise(r => setTimeout(() => r('Промис 2'), 800)),
new Promise(r => setTimeout(() => r('Промис 3'), 600))
]);
displayOutput('async-output', 'За ' + (Date.now() - start) + 'мс: ' + results.join(', '));
}
function setupAsyncEvents() {
const b1 = document.getElementById('basic-async'), b2 = document.getElementById('async-error'), b3 = document.getElementById('async-parallel');
if (b1) b1.addEventListener('click', basicAsyncAwait);
if (b2) b2.addEventListener('click', handleAsyncError);
if (b3) b3.addEventListener('click', parallelAsyncExecution);
}
async function fetchUsers() {
const o = document.getElementById('api-output'), c = document.getElementById('api-data');
o.textContent = 'Загрузка...';
try {
const r = await fetch('https://jsonplaceholder.typicode.com/users');
const u = await r.json();
c.innerHTML = u.map(x => '<div class="user-card"><h4>' + x.name + '</h4><p>' + x.email + '</p></div>').join('');
o.textContent = 'Загружено ' + u.length;
} catch (e) { o.textContent = 'Ошибка: ' + e.message; }
}
async function createPost() {
const o = document.getElementById('api-output');
try {
const r = await fetch('https://jsonplaceholder.typicode.com/posts', {
method: 'POST', headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ title: 'Пост', body: 'Содержимое', userId: 1 })
});
const d = await r.json();
o.textContent = 'Создан: ' + JSON.stringify(d);
} catch (e) { o.textContent = 'Ошибка: ' + e.message; }
}
async function testApiError() {
const o = document.getElementById('api-output');
try {
const r = await fetch('https://jsonplaceholder.typicode.com/nonexistent');
if (!r.ok) throw new Error('HTTP ' + r.status);
} catch (e) { o.textContent = 'Ошибка: ' + e.message; }
}
function setupApiEvents() {
const b1 = document.getElementById('fetch-users'), b2 = document.getElementById('fetch-post'), b3 = document.getElementById('fetch-error');
if (b1) b1.addEventListener('click', fetchUsers);
if (b2) b2.addEventListener('click', createPost);
if (b3) b3.addEventListener('click', testApiError);
}
let intervalId;
function startAsyncInterval() {
if (intervalId) return;
const o = document.getElementById('timer-output');
let c = 0;
intervalId = setInterval(() => { c++; o.textContent = 'Интервал: ' + c; }, 1000);
}
function stopAsyncInterval() {
clearInterval(intervalId); intervalId = null;
const o = document.getElementById('timer-output'); if (o) o.textContent = 'Остановлен';
}
function delayWithPromise(ms) { return new Promise(r => setTimeout(r, ms)); }
async function testDelay() {
const o = document.getElementById('timer-output');
o.textContent = 'Задержка 500...';
await delayWithPromise(500);
o.textContent = 'Задержка 1000...';
await delayWithPromise(500);
o.textContent = 'Готово!';
}
function setupTimerEvents() {
const s = document.getElementById('start-interval'), st = document.getElementById('stop-interval'), d = document.getElementById('delay-promise');
if (s) s.addEventListener('click', startAsyncInterval);
if (st) st.addEventListener('click', stopAsyncInterval);
if (d) d.addEventListener('click', testDelay);
}
async function asyncTryCatch() {
const o = document.getElementById('error-output');
try {
try { await createBasicPromise(false); }
catch (e) { o.textContent = 'Внутренняя: ' + e; throw new Error('Внешняя'); }
} catch (e) { o.textContent += ' | ' + e.message; }
}
async function handleMultipleErrors() {
const o = document.getElementById('error-output');
const r = await Promise.allSettled([createBasicPromise(true), createBasicPromise(false), Promise.resolve('OK')]);
const f = r.filter(x => x.status === 'fulfilled').length;
const rj = r.filter(x => x.status === 'rejected').length;
o.textContent = 'Выполнено: ' + f + ', Отклонено: ' + rj;
}
async function retryWithBackoff(fn, maxRetries = 3) {
let last;
for (let i = 0; i < maxRetries; i++) {
try { return await fn(); }
catch (e) { last = e; await delayWithPromise(Math.pow(2, i) * 500); }
}
throw last;
}
function setupErrorEvents() {
const b1 = document.getElementById('try-catch'), b2 = document.getElementById('multiple-errors'), b3 = document.getElementById('retry-pattern');
if (b1) b1.addEventListener('click', asyncTryCatch);
if (b2) b2.addEventListener('click', handleMultipleErrors);
if (b3) b3.addEventListener('click', () => { retryWithBackoff(() => createBasicPromise(false)).catch(e => displayOutput('error-output', 'Все попытки: ' + e, true)); });
}
async function demonstratePromiseAll() {
const o = document.getElementById('parallel-output');
const r = await Promise.all([createBasicPromise(true), Promise.resolve('R2'), Promise.resolve('R3')]);
o.textContent = 'Promise.all: ' + r.join(', ');
}
async function demonstratePromiseRace() {
const o = document.getElementById('parallel-output');
const r = await Promise.race([new Promise(res => setTimeout(() => res('Быстрый'), 200)), new Promise(res => setTimeout(() => res('Медленный'), 500))]);
o.textContent = 'Promise.race: ' + r;
}
async function demonstratePromiseAllSettled() {
const o = document.getElementById('parallel-output');
const r = await Promise.allSettled([createBasicPromise(true), createBasicPromise(false), Promise.resolve('OK')]);
o.textContent = 'allSettled: ' + r.map((x, i) => (i+1) + ':' + (x.status === 'fulfilled' ? 'Y' : 'N')).join(', ');
}
function setupParallelEvents() {
const b1 = document.getElementById('promise-all'), b2 = document.getElementById('promise-race'), b3 = document.getElementById('promise-allSettled');
if (b1) b1.addEventListener('click', demonstratePromiseAll);
if (b2) b2.addEventListener('click', demonstratePromiseRace);
if (b3) b3.addEventListener('click', demonstratePromiseAllSettled);
}
async function sequentialApiRequests() {
const o = document.getElementById('scenario-output');
o.textContent = 'Запросы...';
try {
const u = await fetch('https://jsonplaceholder.typicode.com/users/1').then(r => r.json());
o.textContent = 'Пользователь: ' + u.name;
const p = await fetch('https://jsonplaceholder.typicode.com/posts?userId=' + u.id).then(r => r.json());
o.textContent += ' | Постов: ' + p.length;
} catch (e) { o.textContent = 'Ошибка: ' + e.message; }
}
async function simulateFileUpload() {
const o = document.getElementById('scenario-output'), f = document.getElementById('progress-fill');
for (let i = 0; i <= 100; i += 10) {
await delayWithPromise(100);
if (f) f.style.width = i + '%';
if (o) o.textContent = 'Загрузка: ' + i + '%';
}
o.textContent = 'Загрузка завершена!';
}
function createRequestCache() {
const cache = new Map();
return async function(url) {
if (cache.has(url)) { console.log('Из кэша:', url); return cache.get(url); }
const d = await fetch(url).then(r => r.json());
cache.set(url, d);
console.log('Запрос:', url);
return d;
};
}
const cachedFetch = createRequestCache();
function setupRealScenarioEvents() {
const b1 = document.getElementById('sequential-requests'), b2 = document.getElementById('upload-simulation'), b3 = document.getElementById('cache-requests');
if (b1) b1.addEventListener('click', sequentialApiRequests);
if (b2) b2.addEventListener('click', simulateFileUpload);
if (b3) b3.addEventListener('click', async () => {
const o = document.getElementById('scenario-output');
o.textContent = 'Тест кэша...';
await cachedFetch('https://jsonplaceholder.typicode.com/posts/1');
await cachedFetch('https://jsonplaceholder.typicode.com/posts/1');
o.textContent = 'Кэш протестирован.';
});
}
function initializeAsyncOperations() {
setupPromiseEvents(); setupAsyncEvents(); setupApiEvents(); setupTimerEvents();
setupErrorEvents(); setupParallelEvents(); setupRealScenarioEvents();
console.log('Асинхронные обработчики инициализированы');
}
document.addEventListener('DOMContentLoaded', initializeAsyncOperations);
