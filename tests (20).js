let passed = 0, failed = 0;
function test(name, fn) {
  try { fn(); console.log(`✅ ${name}`); passed++; }
  catch (e) { console.error(`❌ ${name}: ${e.message}`); failed++; }
}
function assertEqual(actual, expected, msg = '') {
  if (JSON.stringify(actual) !== JSON.stringify(expected))
    throw new Error(`${msg} ожидалось ${JSON.stringify(expected)}, получено ${JSON.stringify(actual)}`);
}
function assertTrue(value, msg = '') {
  if (!value) throw new Error(msg || 'ожидалось true');
}

console.log('--- Тесты ПР10 ---');

// sum
test('sum(1,2,3) = 6', () => assertEqual(sum(1, 2, 3), 6));
test('sum() = 0', () => assertEqual(sum(), 0));
test('sum(5) = 5', () => assertEqual(sum(5), 5));
test('sum(-1, 1) = 0', () => assertEqual(sum(-1, 1), 0));

// createUser
test('createUser с email', () => assertEqual(createUser({ name: 'Иван', age: 25, email: 'ivan@mail.ru' }), 'Пользователь: Иван, возраст: 25, email: ivan@mail.ru'));
test('createUser без email (default)', () => assertEqual(createUser({ name: 'Анна', age: 30 }), 'Пользователь: Анна, возраст: 30, email: не указан'));

// secretMessage
test('secretMessage: верный пароль', () => {
  const check = secretMessage('1234', 'Секрет');
  assertEqual(check('1234'), 'Секрет');
});
test('secretMessage: неверный пароль', () => {
  const check = secretMessage('1234', 'Секрет');
  assertEqual(check('0000'), 'Доступ запрещен');
});

// compose
test('compose: справа налево', () => {
  const addOne = x => x + 1;
  const double = x => x * 2;
  assertEqual(compose(double, addOne)(3), 8); // addOne(3)=4, double(4)=8
});

// myMap / myFilter / myReduce
test('myMap', () => assertEqual(myMap([1, 2, 3], x => x * 2), [2, 4, 6]));
test('myMap с индексом', () => assertEqual(myMap([1, 2, 3], (x, i) => x + i), [1, 3, 5]));
test('myFilter', () => assertEqual(myFilter([1, 2, 3, 4], x => x % 2 === 0), [2, 4]));
test('myReduce без initial', () => assertEqual(myReduce([1, 2, 3], (a, b) => a + b), 6));
test('myReduce с initial', () => assertEqual(myReduce([1, 2, 3], (a, b) => a + b, 10), 16));

// curry
test('curry: полный вызов', () => {
  const add = (a, b, c) => a + b + c;
  assertEqual(curry(add)(1, 2, 3), 6);
});
test('curry: цепочка вызовов', () => {
  const add = (a, b, c) => a + b + c;
  assertEqual(curry(add)(1)(2)(3), 6);
});

// memoize
test('memoize кэширует', () => {
  let calls = 0;
  const slow = memoize(x => { calls++; return x * 2; });
  slow(5); slow(5);
  assertEqual(calls, 1);
  assertEqual(slow(5), 10);
});

// debounce
test('debounce откладывает вызов', (done) => {
  let count = 0;
  const inc = debounce(() => count++, 50);
  inc(); inc(); inc();
  assertEqual(count, 0);
  setTimeout(() => { assertEqual(count, 1); }, 100);
});

// throttle
test('throttle ограничивает вызовы', () => {
  let count = 0;
  const inc = throttle(() => count++, 100);
  inc(); inc(); inc();
  assertTrue(count === 1, `ожидалось 1, получено ${count}`);
});

// createValidator
test('createValidator: валидный', () => {
  const v = createValidator({ minLength: 8, requireDigits: true, requireUppercase: true });
  const res = v('Password1');
  assertTrue(res.isValid, res.errors.join(', '));
});
test('createValidator: ошибки', () => {
  const v = createValidator({ minLength: 8, requireDigits: true, requireUppercase: true });
  const res = v('abc');
  assertTrue(!res.isValid);
  assertTrue(res.errors.length === 3, `ожидалось 3 ошибки, получено ${res.errors.length}`);
});

console.log(`\nИтого: ✅ ${passed} пройдено, ❌ ${failed} провалено`);
