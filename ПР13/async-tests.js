document.addEventListener('DOMContentLoaded', async function() {
console.log('=== ТЕСТЫ ASYNC ===');
const r1 = await createBasicPromise(true);
console.log('resolve:', r1 === 'Успех!' ? 'OK' : 'FAIL');
try { await createBasicPromise(false); console.log('reject: FAIL'); }
catch (e) { console.log('reject: OK'); }
const s = Date.now();
await delayWithPromise(300);
console.log('delay:', (Date.now() - s) >= 290 ? 'OK' : 'FAIL');
});
