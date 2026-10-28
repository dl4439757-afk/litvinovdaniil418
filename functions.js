// Сумма любого количества аргументов
function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}

// Деструктуризация параметров
function createUser({ name, age, email = "не указан" }) {
  return `Пользователь: ${name}, возраст: ${age}, email: ${email}`;
}

// Замыкание: секретное сообщение
function secretMessage(password, message) {
  return function (attempt) {
    return attempt === password ? message : "Доступ запрещен";
  };
}

// Композиция функций
function compose(...functions) {
  return function (value) {
    return functions.reduceRight((acc, fn) => fn(acc), value);
  };
}

// Реализации методов массивов
function myMap(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) result.push(callback(array[i], i, array));
  return result;
}

function myFilter(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) result.push(array[i]);
  }
  return result;
}

function myReduce(array, callback, initialValue) {
  let acc, start;
  if (initialValue !== undefined) { acc = initialValue; start = 0; }
  else { acc = array[0]; start = 1; }
  for (let i = start; i < array.length; i++) {
    acc = callback(acc, array[i], i, array);
  }
  return acc;
}

// Каррирование
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args);
    return (...next) => curried(...args, ...next);
  };
}

// Мемоизация
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// Дебаунсинг
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// Троттлинг
function throttle(fn, interval) {
  let lastTime = 0;
  let trailingTimeout = null;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn(...args);
    } else if (!trailingTimeout) {
      trailingTimeout = setTimeout(() => {
        lastTime = Date.now();
        trailingTimeout = null;
        fn(...args);
      }, interval - (now - lastTime));
    }
  };
}

// Функция-валидатор
function createValidator(options = {}) {
  const { minLength = 0, requireDigits = false, requireUppercase = false } = options;
  return function (value) {
    const errors = [];
    if (value.length < minLength) errors.push(`Минимум ${minLength} символов`);
    if (requireDigits && !/\d/.test(value)) errors.push('Нужна хотя бы одна цифра');
    if (requireUppercase && !/[A-ZА-Я]/.test(value)) errors.push('Нужна хотя бы одна заглавная буква');
    return { isValid: errors.length === 0, errors };
  };
}
