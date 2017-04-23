import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Signup } from './Signup';

if(Meteor.isClient) {
  describe('Signup', function() {
    it('should show error messages when error state is set', function() {
      const error = 'This is not working';

      //not testing login so passing an empty obj for loginWithPassword
      const wrapper = mount(<Signup createUser={() => {}}/>);

      const actualErrorMsg = wrapper.setState({ error }).find('p').text();;

      expect(actualErrorMsg).toBe(error);

      wrapper.setState({ error: ''});
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call createUser with the form data', function() {
      const email = 'lars.vraa@gmail.com';
      const password = 'ioioioioio';
      const spy = expect.createSpy();

      const wrapper = mount(<Signup createUser={spy}/>);

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({ email, password });
    });


    it('should set error if short password ', function() {
      const email = 'lars.vraa@gmail.com';
      const password = 'ioioio       ';
      const spy = expect.createSpy();

      const wrapper = mount(<Signup createUser={spy}/>);

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(wrapper.state('error').length).toNotBe(0);
    });

    it('should set createUser callback errors', function() {
      const password = 'ioioioioio';
      const reason = 'This is why it failed';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy}/>);

      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      spy.calls[0].arguments[1]({reason});
      expect(wrapper.state('error')).toBe(reason);

      spy.calls[0].arguments[1]();
      expect(wrapper.state('error').length).toBe(0);
    });
  });
}
