// ===== Числа =====
// O(sqrt(n))
function isPrime(number) {
  if (number < 2) return false;
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) return false;
  }
  return true;
}

// O(n)
function factorial(n) {
  if (n < 0) return null;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

// O(n)
function fibonacci(n) {
  const result = [];
  let a = 0, b = 1;
  for (let i = 0; i < n; i++) {
    result.push(a);
    [a, b] = [b, a + b];
  }
  return result;
}

// O(log(min(a,b))) — алгоритм Евклида
function gcd(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a;
}

// ===== Строки =====
// O(n)
function isPalindrome(str) {
  const clean = str.toLowerCase().replace(/[^a-zа-яё0-9]/g, '');
  return clean === clean.split('').reverse().join('');
}

// O(n)
function countVowels(str) {
  const vowels = 'aeiouаеёиоуыэюя';
  return str.toLowerCase().split('').filter(c => vowels.includes(c)).length;
}

// O(n)
function reverseString(str) {
  let result = '';
  for (let i = str.length - 1; i >= 0; i--) result += str[i];
  return result;
}

// O(n)
function findLongestWord(sentence) {
  const words = sentence.split(/\s+/).filter(Boolean);
  return words.reduce((longest, w) => w.length > longest.length ? w : longest, '');
}

// ===== Массивы =====
// O(n)
function findMax(arr) {
  if (arr.length === 0) return undefined;
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) if (arr[i] > max) max = arr[i];
  return max;
}

// O(n)
function removeDuplicates(arr) {
  return [...new Set(arr)];
}

// O(n²)
function bubbleSort(arr) {
  const result = [...arr];
  for (let i = 0; i < result.length - 1; i++) {
    for (let j = 0; j < result.length - 1 - i; j++) {
      if (result[j] > result[j + 1]) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
      }
    }
  }
  return result;
}

// O(log n) — массив должен быть отсортирован
function binarySearch(sortedArr, target) {
  let left = 0, right = sortedArr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (sortedArr[mid] === target) return mid;
    if (sortedArr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

// ===== Утилиты =====
// O(n) где n — длина строки
function formatCurrency(amount, currency = '₽') {
  const [int, dec] = amount.toFixed(2).split('.');
  const spaced = int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${spaced}.${dec} ${currency}`;
}

function isValidEmail(email) {
  return /^[\w.-]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email);
}

function generatePassword(length = 8) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%&*';
  let password = '';
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) password += chars[array[i] % chars.length];
  return password;
}
