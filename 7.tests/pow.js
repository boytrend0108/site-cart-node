// Exponential function 
const pow = (x, n) => {
    if (x == null || n == null) return null;
    let result = 1;

    for (let i = 0; i < n; i++) {
        result *= x;
    }

    return result;
}

module.exports = pow; // export func outside
