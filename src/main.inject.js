// @flow
import Manifest from './manifest'

class Person {
    static name = Manifest.name
}

function foo(x: ? number): Person {
    return new Person();
}

console.log(foo());
