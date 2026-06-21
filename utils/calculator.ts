export const evaluateExpression = (expression: string) => {
  try {
    if (!expression) return '';

    const exp = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/');

    // prevent broken expressions like "5+"
    if (/[+\-*/.]$/.test(exp)) {
      return exp.slice(0, -1);
    }

    return eval(exp).toString();
  } catch {
    return 'Error';
  }
};