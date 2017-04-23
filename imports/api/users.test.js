import expect from 'expect';
import { validateNewUser } from './users';
import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  describe('users', function () {
    it('it should allow valid email address', function() {
      const testUser = {
        emails: [
          {
            address: 'lars.vraa@gmail.com'
          }
        ]
      };
      const res = validateNewUser(testUser);
      expect(res).toBe(true);
    });
    it('it should reject invalid email', function () {
      const testUser = {
        emails: [
          {
            address: 'lars.vraagmail.com'
          }
        ]
      };
      expect (() => {
        validateNewUser(testUser);
      }).toThrow();
    })
  });
}



// const add = (a,b) => {
//   if (typeof b !== 'number') {
//     return a + a;
//   }
//   return a + b;
// }
//
// const square = (a) => a * a;
//
// describe ('add', function (){
//   it('it should add two numbers',function () {
//     const res = add(11, 9);
//
//     expect (res).toBe(20);
//   });
//
//   it('it should double a single number', function () {
//     const res = add(44);
//
//     expect(res).toBe(88);
//
//   });
// });
//
//
// describe ('square', function (){
//   it('it should square a single number', function () {
//     const res = square(4);
//     expect(res).toBe(16);
//
//   });
// });
