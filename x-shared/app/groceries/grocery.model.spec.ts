import 'reflect-metadata';
import { Grocery } from './grocery.model';

declare var describe: any;
declare var expect: any;
declare var it: any;

describe('Grocery', function() {
  let grocery = new Grocery('42', 'answer');


  it('Should create Grocery', function () {
    expect(grocery).toBeTruthy();
  });
});
