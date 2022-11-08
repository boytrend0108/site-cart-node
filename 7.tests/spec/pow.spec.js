const pow = require('../pow');// connect modul 'pow'

describe('Возведение в степень', () => {
    it('2 в 3 степени => 8', function () {
        expect(pow(2, 3)).toBe(8);
    });
    it('2 в 5 степени => 32', function () {
        expect(pow(2, 5)).toBe(32);
    });
    it('3 в 3 степени => 27', function () {
        expect(pow(3, 3)).toBe(27);
    });
});

describe('Нестандартные ситуации', () => {
    it('null в 3 степени => null', function () {
        expect(pow(null, 3)).toBeNull();
    });
    it('2 в null степени => null', function () {
        expect(pow(2, null)).toBeNull();
    });
});