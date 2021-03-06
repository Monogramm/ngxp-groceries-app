import 'reflect-metadata';
import { User } from './user.model';

declare var describe: any;
declare var expect: any;
declare var it: any;

describe('User', function() {
  let user = new User();


  it('Should reject an empty email address', function () {
    user.email = '';
    expect(user.isValidEmail()).toBe(false);
  });

  it('Should reject a malformed email addresses', function() {
    user.email = 'nativescript';
    expect(user.isValidEmail()).toBe(false);

    user.email = 'nativescript@';
    expect(user.isValidEmail()).toBe(false);

    user.email = 'nativescript@isawesome';
    expect(user.isValidEmail()).toBe(false);
  });

  it('Should accept valid email addresses', function() {
    user.email = 'nativescript@isawesome.com';
    expect(user.isValidEmail()).toBe(true);
  });


  it('Should reject an empty password', function () {
    user.password = '';
    expect(user.isValidPassword()).toBe(false);
  });

  it('Should reject a malformed password', function() {
    user.password = 'password';
    expect(user.isValidPassword()).toBe(false);

    user.password = 'password@';
    expect(user.isValidPassword()).toBe(false);

    user.password = 'password@isawesome';
    expect(user.isValidPassword()).toBe(false);
  });

  it('Should accept valid password', function() {
    user.password = 'password@isawesome.123';
    expect(user.isValidPassword()).toBe(true);
  });
});
