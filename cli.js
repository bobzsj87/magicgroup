// A heuristic algorithm for grouping

const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const core = require('./core');

const langGroup = [
    ['se', 'da', 'no'],
    ['es', 'pt'],
]

// sort desc, satisify big group first
if (argv._.length == 0) {
    console.warn("You must specify the number of groups");
    process.exit(1);
}


let list = fs.readFileSync(argv.f || 'test/input.csv', 'utf8').split("\n");
let rawStuList = [];
for (let i in list){
    if (list[i].length) {
        l = list[i].split(',');
        rawStuList.push({
            name:l[0],
            feature:l[1]
        })
    }
}

console.log(core.group(rawStuList, argv._[0]))
