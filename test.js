
const assert = require('assert');
const core = require('./core');

assert(JSON.stringify(core.buildGroups(17,4)) == JSON.stringify([5, 4, 4, 4]))

let stuList = [{name: 'a', feature:'zh'}, {name: 'b', feature:'zh'},
{name: 'c', feature:'en'}, {name: 'd', feature:'es'}]
let l = core.buildList(stuList);
console.log(core.roundRobind(stuList, 2))

console.log("ok")
