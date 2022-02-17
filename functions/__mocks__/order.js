export function mockOrderFile() {
  jest.fn();
}
export function mock() {
  jest.fn().mockImplementation(() => {
    return { orderFile: mockOrderFile };
  });
}
// const order = jest.createMockFromModule("../order/controller/orders");

// export default class Order {
//   constructor() {}
//   readOne(orderId) {
//     return {
//       refodr: "ref-order",
//       dateodr: {
//         _seconds: 1645095898,
//         _nanoseconds: 0,
//       },
//       priceodr: "price-order",
//       adressodr: "address-order",
//       quantityodr: "quantity-order",
//       statusodr: "status-order",
//     };
//   }
// }
// order.readOne = (orderId) => ({
//     refodr: 'ref-order',
//     dateodr : {
//         "_seconds": 1645095898,
//         "_nanoseconds": 0
//     },
//     priceodr: 'price-order',
//     adressodr : 'address-order',
//     quantityodr: 'quantity-order',
//     statusodr :'status-order'
// });
