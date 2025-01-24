"use strict";
function isLegal(users) {
    const newArr = users.filter((value) => value.age >= 18);
    console.log(newArr);
}
const users = [{ name: "yat", age: 21 }, { name: "pap", age: 17 }, { name: "lallu", age: 22 }];
isLegal(users);
