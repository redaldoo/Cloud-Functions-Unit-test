const { adminStub, test } = require('../../utils/unitTestConfig');

let order;
beforeAll(() => {
    order = require('./orders');
    return;
});
afterAll(() => {
    adminStub.mockRestore();
    test.cleanup();
});
describe('testing ordersController::readAll',() => {
    it('test function returns data', () => {
        expect(order.readAll()).toHaveBeenCalled();
    })
} )