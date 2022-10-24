function calculator(expr) {
  expr = expr.replace(/\s/g, "");
  const operatorMatches = expr.match(/(\-|\+|\/|\*)/g);
  let isRoman = false;
  if (operatorMatches.length > 1) {
    throw Error("Операднов больше 1");
  }
  const operator = operatorMatches[0];

  let operand1 = expr.split(operator)[0];
  let operand2 = expr.split(operator)[1];
  if (expr.match(/(\.|\,)/)) {
    throw Error("Операнд не целое число");
  }
  if (isNaN(parseInt(operand1)) || isNaN(parseInt(operand2))) {
    const romanMatcher = /(I|V|X)/i;
    let oper1 = operand1.toString().match(romanMatcher);
    let oper2 = operand2.toString().match(romanMatcher);
    if (oper1 && oper2) {
      operand1 = convertRoman(operand1);
      operand2 = convertRoman(operand2);
      isRoman = true;
    } else throw Error("Неправильные операнды");
  }

  operand1 = parseInt(operand1);
  operand2 = parseInt(operand2);

  if (operand1 > 10 || operand2 > 10) {
    throw Error("Операнд больше 10");
  }

  if (operand1 == 0 || operand2 == 0) throw Error("Ошибка");

  let result;
  switch (operator) {
    case "+":
      result = parseInt(operand1 + operand2);
      break;
    case "-":
      result = parseInt(operand1 - operand2);
      break;
    case "/":
      result = parseInt(operand1 / operand2);
      break;
    case "*":
      result = parseInt(operand1 * operand2);
      break;
  }
  if (isRoman) {
    if (result <= 0) return "";
    return convertRoman(result);
  }
  console.log(result, operand1, operand2);
  return result.toString();
}

function convertRoman(num) {
  const romanToArabicDictionary = {
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  if (typeof num == "number") {
    let roman = "";
    asds: for (let i = 0; num > 0; i++) {
      for (const key in romanToArabicDictionary) {
        if (num >= romanToArabicDictionary[key]) {
          num -= romanToArabicDictionary[key];
          roman += key;
          continue asds;
        }
      }
    }
    return roman;
  }

  let arabic = 0;
  for (let i = 0; i < num.length; i++) {
    let symbol = num.split("")[i];
    if (romanToArabicDictionary[symbol + num[i + 1]]) {
      symbol += num[++i];
    }
    arabic += romanToArabicDictionary[symbol];
  }
  return arabic;
}
