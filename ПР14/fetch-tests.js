document.addEventListener('DOMContentLoaded', async function() {
console.log('=== ТЕСТЫ FETCH ===');
try {
const r = await fetch(API_BASE_URL + '/posts/1');
console.log('GET:', r.ok ? 'OK' : 'FAIL');
} catch (e) { console.log('GET FAIL:', e.message); }
try {
const r = await fetch(API_BASE_URL + '/posts', {
method: 'POST', headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ title: 't', body: 'b', userId: 1 })
});
console.log('POST:', r.ok ? 'OK' : 'FAIL');
} catch (e) { console.log('POST FAIL:', e.message); }
});
