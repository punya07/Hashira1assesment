const fs = require('fs');

function decodeValue(baseStr, valueStr) {
  const base = parseInt(baseStr, 10);
  return BigInt('0x' + BigInt(parseInt(valueStr, base)).toString(16)); 
}


function lagrangeInterpolationAtZero(shares) {
  const k = shares.length;
  let result = 0n;

  for (let i = 0; i < k; i++) {
    let numerator = shares[i].y;
    let denominator = 1n;

    for (let j = 0; j < k; j++) {
      if (i !== j) {
        numerator *= BigInt(shares[j].x);
        denominator *= BigInt(shares[j].x - shares[i].x);
      }
    }

    result += numerator / denominator;
  }
  return result;
}


function decodeBaseToBigInt(valueStr, base) {
  const digits = '0123456789abcdefghijklmnopqrstuvwxyz';
  let result = 0n;
  const baseBig = BigInt(base);
  const val = valueStr.toLowerCase();
  for (let char of val) {
    let digit = BigInt(digits.indexOf(char));
    if (digit === -1n) {
      throw new Error(`Invalid digit '${char}' for base ${base}`);
    }
    result = result * baseBig + digit;
  }
  return result;
}

const data = JSON.parse(fs.readFileSync('testcase.json', 'utf-8'));

const k = data.keys.k;
const shares = [];

let count = 0;
for (const key in data) {
  if (key === 'keys') continue;
  if (count >= k) break;
  const x = parseInt(key, 10);
  const base = parseInt(data[key].base, 10);
  const valueStr = data[key].value;

  const y = decodeBaseToBigInt(valueStr, base);
  shares.push({ x, y });

  console.log(`x: ${x}, base: ${base}, value: ${valueStr}, decoded y: ${y}`);
  count++;
}

const secret = lagrangeInterpolationAtZero(shares);
console.log(`\nRecovered secret constant C = ${secret}`);
