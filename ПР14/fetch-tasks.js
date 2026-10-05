const API_BASE_URL = 'https://jsonplaceholder.typicode.com';
async function fetchGetRequest() {
const o = document.getElementById('get-output'); o.textContent = 'Загрузка...';
try {
const r = await fetch(API_BASE_URL + '/posts/1');
if (!r.ok) throw new Error('HTTP ' + r.status);
const d = await r.json();
o.textContent = JSON.stringify(d, null, 2);
} catch (e) { o.textContent = 'Ошибка: ' + e.message; }
}
async function fetchJsonData() {
const o = document.getElementById('get-output'), c = document.getElementById('get-data');
o.textContent = 'Загрузка...';
try {
const r = await fetch(API_BASE_URL + '/users');
const u = await r.json();
c.innerHTML = u.map(x => '<div class="user-card"><h4>' + x.name + '</h4><p>' + x.email + '</p><p>' + x.phone + '</p></div>').join('');
o.textContent = 'Загружено ' + u.length;
} catch (e) { o.textContent = 'Ошибка: ' + e.message; }
}
async function fetchWithError() {
const o = document.getElementById('get-output');
try {
const r = await fetch(API_BASE_URL + '/nonexistent');
if (!r.ok) throw new Error('HTTP ' + r.status);
} catch (e) { o.textContent = 'Ошибка: ' + e.message; }
}
function setupGetRequests() {
const b1 = document.getElementById('fetch-get'), b2 = document.getElementById('fetch-json'), b3 = document.getElementById('fetch-error');
if (b1) b1.addEventListener('click', fetchGetRequest);
if (b2) b2.addEventListener('click', fetchJsonData);
if (b3) b3.addEventListener('click', fetchWithError);
}
async function fetchPostRequest() {
const o = document.getElementById('crud-output');
try {
const r = await fetch(API_BASE_URL + '/posts', {
method: 'POST', headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ title: 'Новый', body: 'Текст', userId: 1 })
});
const d = await r.json(); o.textContent = 'POST: ' + JSON.stringify(d);
} catch (e) { o.textContent = 'Ошибка: ' + e.message; }
}
async function fetchPutRequest() {
const o = document.getElementById('crud-output');
try {
const r = await fetch(API_BASE_URL + '/posts/1', {
method: 'PUT', headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ id: 1, title: 'Обновлён', body: 'Новое', userId: 1 })
});
const d = await r.json(); o.textContent = 'PUT: ' + JSON.stringify(d);
} catch (e) { o.textContent = 'Ошибка: ' + e.message; }
}
async function fetchDeleteRequest() {
const o = document.getElementById('crud-output');
try {
const r = await fetch(API_BASE_URL + '/posts/1', { method: 'DELETE' });
o.textContent = 'DELETE статус: ' + r.status;
} catch (e) { o.textContent = 'Ошибка: ' + e.message; }
}
function setupCrudRequests() {
const b1 = document.getElementById('fetch-post'), b2 = document.getElementById('fetch-put'), b3 = document.getElementById('fetch-delete');
if (b1) b1.addEventListener('click', fetchPostRequest);
if (b2) b2.addEventListener('click', fetchPutRequest);
if (b3) b3.addEventListener('click', fetchDeleteRequest);
}
async function fetchWithHeaders() {
const o = document.getElementById('headers-output');
try {
const r = await fetch(API_BASE_URL + '/posts', { headers: { 'X-Custom': 'Val', 'Authorization': 'Bearer token' } });
const d = await r.json();
o.textContent = 'Ответ: ' + d.length + ' элементов';
} catch (e) { o.textContent = 'Ошибка: ' + e.message; }
}
async function fetchWithParams() {
const o = document.getElementById('headers-output');
const p = new URLSearchParams({ _limit: 5, _sort: 'id', _order: 'desc' });
try {
const r = await fetch(API_BASE_URL + '/posts?' + p);
const d = await r.json();
o.textContent = 'Получено ' + d.length + ' (по убыванию)';
} catch (e) { o.textContent = 'Ошибка: ' + e.message; }
}
async function fetchWithTimeout() {
const o = document.getElementById('headers-output');
const c = new AbortController();
setTimeout(() => c.abort(), 3000);
try {
const r = await fetch(API_BASE_URL + '/posts', { signal: c.signal });
const d = await r.json();
o.textContent = 'Успешно: ' + d.length;
} catch (e) { o.textContent = e.name === 'AbortError' ? 'Таймаут' : 'Ошибка: ' + e.message; }
}
function setupHeadersAndParams() {
const b1 = document.getElementById('fetch-headers'), b2 = document.getElementById('fetch-params'), b3 = document.getElementById('fetch-timeout');
if (b1) b1.addEventListener('click', fetchWithHeaders);
if (b2) b2.addEventListener('click', fetchWithParams);
if (b3) b3.addEventListener('click', fetchWithTimeout);
}
async function fetchAndCheckStatus() {
const o = document.getElementById('response-output');
try {
const r = await fetch(API_BASE_URL + '/posts/1');
if (!r.ok) throw new Error('HTTP ' + r.status);
o.textContent = 'OK! Статус: ' + r.status;
} catch (e) { o.textContent = 'Ошибка: ' + e.message; }
}
async function fetchAndReadHeaders() {
const o = document.getElementById('response-output');
try {
const r = await fetch(API_BASE_URL + '/posts/1');
const h = [];
r.headers.forEach((v, k) => h.push(k + ': ' + v));
o.innerHTML = h.join('<br>');
} catch (e) { o.textContent = 'Ошибка: ' + e.message; }
}
function setupResponseHandling() {
const b1 = document.getElementById('fetch-status'), b2 = document.getElementById('fetch-headers-response');
if (b1) b1.addEventListener('click', fetchAndCheckStatus);
if (b2) b2.addEventListener('click', fetchAndReadHeaders);
}
async function fetchNetworkError() {
const o = document.getElementById('error-output');
try { await fetch('https://nonexistent-domain-12345.com/api'); }
catch (e) { o.textContent = 'Сетевая: ' + e.message; }
}
async function fetchHttpError() {
const o = document.getElementById('error-output');
try {
const r = await fetch(API_BASE_URL + '/nonexistent');
if (!r.ok) throw new Error('HTTP ' + r.status);
} catch (e) { o.textContent = 'HTTP: ' + e.message; }
}
async function fetchWithAbort() {
const o = document.getElementById('error-output');
const c = new AbortController();
setTimeout(() => c.abort(), 1000);
try { await fetch(API_BASE_URL + '/posts', { signal: c.signal }); }
catch (e) { o.textContent = e.name === 'AbortError' ? 'Отменён' : 'Ошибка'; }
}
async function fetchWithRetry(url, options = {}, retries = 3) {
for (let i = 0; i < retries; i++) {
try {
const r = await fetch(url, options);
if (!r.ok) throw new Error('HTTP ' + r.status);
return await r.json();
} catch (e) {
if (i === retries - 1) throw e;
await new Promise(res => setTimeout(res, Math.pow(2, i) * 500));
}
}
}
function setupErrorHandling() {
const b1 = document.getElementById('fetch-network-error'), b2 = document.getElementById('fetch-http-error');
const b3 = document.getElementById('fetch-abort'), b4 = document.getElementById('fetch-retry');
if (b1) b1.addEventListener('click', fetchNetworkError);
if (b2) b2.addEventListener('click', fetchHttpError);
if (b3) b3.addEventListener('click', fetchWithAbort);
if (b4) b4.addEventListener('click', async () => {
const o = document.getElementById('error-output');
try {
const d = await fetchWithRetry(API_BASE_URL + '/posts/1');
o.textContent = 'После повторов: ' + d.title;
} catch (e) { o.textContent = 'Все попытки: ' + e.message; }
});
}
async function fetchWithPromiseAll() {
const o = document.getElementById('parallel-output');
const s = Date.now();
const r = await Promise.all([
fetch(API_BASE_URL + '/posts/1').then(x => x.json()),
fetch(API_BASE_URL + '/posts/2').then(x => x.json()),
fetch(API_BASE_URL + '/posts/3').then(x => x.json())
]);
o.textContent = 'all за ' + (Date.now() - s) + 'мс: ' + r.map(p => p.title).join(', ');
}
async function fetchWithPromiseRace() {
const o = document.getElementById('parallel-output');
const r = await Promise.race([
fetch(API_BASE_URL + '/posts/1').then(x => x.json()),
new Promise((_, rej) => setTimeout(() => rej(new Error('Таймаут')), 500))
]);
o.textContent = 'Быстрейший: ' + r.title;
}
async function fetchSequentialRequests() {
const o = document.getElementById('parallel-output');
const s = Date.now();
const p = await fetch(API_BASE_URL + '/posts/1').then(x => x.json());
const u = await fetch(API_BASE_URL + '/users/' + p.userId).then(x => x.json());
o.textContent = 'Последовательно за ' + (Date.now() - s) + 'мс: ' + p.title + ' / ' + u.name;
}
function setupParallelRequests() {
const b1 = document.getElementById('fetch-promise-all'), b2 = document.getElementById('fetch-promise-race'), b3 = document.getElementById('fetch-sequential');
if (b1) b1.addEventListener('click', fetchWithPromiseAll);
if (b2) b2.addEventListener('click', fetchWithPromiseRace);
if (b3) b3.addEventListener('click', fetchSequentialRequests);
}
async function fetchUserWithPosts() {
const o = document.getElementById('scenario-output');
try {
const u = await fetch(API_BASE_URL + '/users/1').then(r => r.json());
const p = await fetch(API_BASE_URL + '/posts?userId=' + u.id).then(r => r.json());
o.textContent = u.name + ' | Постов: ' + p.length;
} catch (e) { o.textContent = 'Ошибка: ' + e.message; }
}
async function fetchWithSearch() {
const o = document.getElementById('scenario-output');
try {
const p = await fetch(API_BASE_URL + '/posts').then(r => r.json());
const r = p.filter(x => x.title.toLowerCase().includes('qui'));
o.textContent = 'Найдено ' + r.length;
} catch (e) { o.textContent = 'Ошибка: ' + e.message; }
}
function createFetchCache() {
const cache = new Map();
return async function(url) {
if (cache.has(url)) { console.log('Из кэша:', url); return cache.get(url); }
const d = await fetch(url).then(r => r.json());
cache.set(url, d);
console.log('Запрос:', url);
return d;
};
}
const cachedFetch = createFetchCache();
function setupRealScenarios() {
const b1 = document.getElementById('fetch-user-posts'), b2 = document.getElementById('fetch-search'), b3 = document.getElementById('fetch-cache');
if (b1) b1.addEventListener('click', fetchUserWithPosts);
if (b2) b2.addEventListener('click', fetchWithSearch);
if (b3) b3.addEventListener('click', async () => {
const o = document.getElementById('scenario-output');
await cachedFetch(API_BASE_URL + '/posts/1');
await cachedFetch(API_BASE_URL + '/posts/1');
o.textContent = 'Кэш протестирован';
});
}
function initializeFetchAPI() {
setupGetRequests(); setupCrudRequests(); setupHeadersAndParams(); setupResponseHandling();
setupErrorHandling(); setupParallelRequests(); setupRealScenarios();
console.log('Fetch API инициализирован');
}
document.addEventListener('DOMContentLoaded', initializeFetchAPI);
