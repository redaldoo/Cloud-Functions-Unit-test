const { adminStub, test } = require('./utils/unitTestConfig');

//dummy test example
let index;
beforeAll(() =>{
    index = require('./index');
    return;
});
afterAll(() =>{
    adminStub.mockRestore();
    test.cleanup();
});
describe('testing basic function',() =>{
    it('test function returns 6',() =>{
        expect(index.basicTest()).toBe(6);
    });
});