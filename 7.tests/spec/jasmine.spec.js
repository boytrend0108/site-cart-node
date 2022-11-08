describe('Соответствие значений', function () {
    it('проверка значения переменной a на равенство 10', function () {
        let a = 10;// same condition

        expect(a).toBe(10);// expect that a have to be 10
    });
});

describe(`Дополнительные фун-и`, function () {
    it('Objects', function () {
        const user = {
            name: 'Ann',
            age: 20,
            go: () => { } //But func are compered by links!!!
        };
        const user2 = {
            name: "Ann",
            age: 20,
            go: () => { } //But func are compered by links!!!
        };
        // Objects are compered by key. But func are compered by links!!!
        expect(user).toEqual(user2);
    });

    it('Array', function () {
        const arr1 = [`White`, `black`];
        const arr2 = [`black`, `White`];
        // Arrays are compered by index
        expect(arr1).toEqual(arr2);
        // expect(arr1).not.toEqual(arr2);// not equal
    });

    it('Redexps', function () {
        const str = `Test AbcD Jasmine`

        expect(str).toMatch(/abcd/i);
    });
});


// Other methods:
// expect().toBeNull();
// expect().toBeUndefined();
// expect().toBeTrusty();
// expect().toBeFalsy();
// expect().toBeNaN();
// expect().toBeGreaterThan();
// expect().toBeGreaterThanOrEqual();
// expect().toBeLessThan();
// expect().toBeLessThanOrEqual();
// expect().toBeCloseTo();
