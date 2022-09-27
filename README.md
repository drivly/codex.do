# codex.do
GPT-3 Codex Completions API

<https://codex.do/fizzBuzz>
```javascript
// ES6 arrow function called fizzBuzz
const fizzBuzz = (num) => {
  // if the number is divisible by 3 and 5, return FizzBuzz
  if (num % 3 === 0 && num % 5 === 0) {
    return 'FizzBuzz';
  }
  // if the number is divisible by 3, return Fizz
  if (num % 3 === 0) {
    return 'Fizz';
  }
  // if the number is divisible by 5, return Buzz
  if (num % 5 === 0) {
    return 'Buzz';
  }
  // if the number is not divisible by 3 or 5, return the number
  return num;
};

// for loop that iterates from 1 to 100
for (let i = 1; i <= 100; i++) {
  // console.log the result of fizzBuzz(i)
  console.log(fizzBuzz(i));
}
```

<https://codex.do/fizzBuzz?json>
