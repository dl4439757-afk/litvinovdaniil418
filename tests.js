// Простой фреймворк тестирования
let passed = 0, failed = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
    passed++;
  } catch (e) {
    console.error(`❌ ${name}: ${e.message}`);
    failed++;
  }
}
function assertEqual(actual, expected, msg = '') {
  if (JSON.stringify(actual) !== JSON.stringify(expected))
    throw new Error(`${msg} ожидалось ${JSON.stringify(expected)}, получено ${JSON.stringify(actual)}`);
}

console.log('--- Тесты ПР9 ---');

// isPrime
test('isPrime(7) = true', () => assertEqual(isPrime(7), true));
test('isPrime(1) = false', () => assertEqual(isPrime(1), false));
test('isPrime(0) = false', () => assertEqual(isPrime(0), false));
test('isPrime(2) = true', () => assertEqual(isPrime(2), true));
test('isPrime(25) = false', () => assertEqual(isPrime(25), false));
test('isPrime(97) = true', () => assertEqual(isPrime(97), true));

// factorial
test('factorial(5) = 120', () => assertEqual(factorial(5), 120));
test('factorial(0) = 1', () => assertEqual(factorial(0), 1));
test('factorial(1) = 1', () => assertEqual(factorial(1), 1));

// fibonacci
test('fibonacci(7) = [0,1,1,2,3,5,8]', () => assertEqual(fibonacci(7), [0,1,1,2,3,5,8]));
test('fibonacci(0) = []', () => assertEqual(fibonacci(0), []));

// gcd
test('gcd(12, 18) = 6', () => assertEqual(gcd(12, 18), 6));
test('gcd(7, 13) = 1', () => assertEqual(gcd(7, 13), 1));
test('gcd(0, 5) = 5', () => assertEqual(gcd(0, 5), 5));

// isPalindrome
test('isPalindrome("А роза упала на лапу Азора") = true', () => assertEqual(isPalindrome('А роза упала на лапу Азора'), true));
test('isPalindrome("hello") = false', () => assertEqual(isPalindrome('hello'), false));
test('isPalindrome("madam") = true', () => assertEqual(isPalindrome('madam'), true));

// countVowels
test('countVowels("привет") = 2', () => assertEqual(countVowels('привет'), 2));
test('countVowels("Hello") = 2', () => assertEqual(countVowels('Hello'), 2));
test('countVowels("гдн") = 0', () => assertEqual(countVowels('гдн'), 0));

// reverseString
test('reverseString("abc") = "cba"', () => assertEqual(reverseString('abc'), 'cba'));
test('reverseString("") = ""', () => assertEqual(reverseString(''), ''));

// findLongestWord
test('findLongestWord("я изучаю программирование") = "программирование"', () => assertEqual(findLongestWord('я изучаю программирование'), 'программирование'));

// findMax
test('findMax([3, 1, 9, 2]) = 9', () => assertEqual(findMax([3, 1, 9, 2]), 9));
test('findMax([-5, -1, -9]) = -1', () => assertEqual(findMax([-5, -1, -9]), -1));
test('findMax([]) = undefined', () => assertEqual(findMax([]), undefined));

// removeDuplicates
test('removeDuplicates([1,2,2,3,4,4,5]) = [1,2,3,4,5]', () => assertEqual(removeDuplicates([1,2,2,3,4,4,5]), [1,2,3,4,5]));
test('removeDuplicates([]) = []', () => assertEqual(removeDuplicates([]), []));

// bubbleSort
test('bubbleSort([4,2,9,1]) = [1,2,4,9]', () => assertEqual(bubbleSort([4,2,9,1]), [1,2,4,9]));
test('bubbleSort([]) = []', () => assertEqual(bubbleSort([]), []));
test('bubbleSort([5,5,1]) = [1,5,5]', () => assertEqual(bubbleSort([5,5,1]), [1,5,5]));

// binarySearch
test('binarySearch([1,2,3,4,5], 4) = 3', () => assertEqual(binarySearch([1,2,3,4,5], 4), 3));
test('binarySearch([1,2,3], 9) = -1', () => assertEqual(binarySearch([1,2,3], 9), -1));
test('binarySearch([10], 10) = 0', () => assertEqual(binarySearch([10], 10), 0));

// formatCurrency
test('formatCurrency(1234.56) = "1 234.56 ₽"', () => assertEqual(formatCurrency(1234.56), '1 234.56 ₽'));
test('formatCurrency(100) = "100.00 ₽"', () => assertEqual(formatCurrency(100), '100.00 ₽'));
test('formatCurrency(1000, "$") = "1 000.00 $"', () => assertEqual(formatCurrency(1000, '$'), '1 000.00 $'));

// isValidEmail
test('isValidEmail("user@mail.ru") = true', () => assertEqual(isValidEmail('user@mail.ru'), true));
test('isValidEmail("invalid") = false', () => assertEqual(isValidEmail('invalid'), false));
test('isValidEmail("a@b") = false', () => assertEqual(isValidEmail('a@b'), false));

// generatePassword
test('generatePassword(12) длина 12', () => assertEqual(generatePassword(12).length, 12));
test('generatePassword() длина 8', () => assertEqual(generatePassword().length, 8));

console.log(`\nИтого: ✅ ${passed} пройдено, ❌ ${failed} провалено`);
