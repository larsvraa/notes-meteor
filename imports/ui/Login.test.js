import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Login } from './Login';

if(Meteor.isClient) {
  describe('Login', function() {
    it('should show error messages when error state is set', function() {
      const error = 'This is not working';

      //not testing login so passing an empty obj for loginWithPassword
      const wrapper = mount(<Login loginWithPassword={() => {}}/>);

      const actualErrorMsg = wrapper.setState({ error }).find('p').text();;

      expect(actualErrorMsg).toBe(error);

      wrapper.setState({ error: ''});
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call loginWithPassword with the form data', function() {
      const email = 'lars.vraa@gmail.com';
      const password = 'ioioioioio';
      const spy = expect.createSpy();

      const wrapper = mount(<Login loginWithPassword={spy}/>);

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({ email });
      expect(spy.calls[0].arguments[1]).toBe(password);

    });

    it('should set loginWithPassword callback errors', function() {
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy}/>);

      wrapper.find('form').simulate('submit');

      //call err() - 3rd argument with an object to write the error
      spy.calls[0].arguments[2]({});
      expect(wrapper.state('error').length).toNotBe(0);

      //call err() - 3rd argument with no object should clear the error
      spy.calls[0].arguments[2]();
      expect(wrapper.state('error').length).toBe(0);
    });
  });
}
