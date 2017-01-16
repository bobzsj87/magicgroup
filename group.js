// A heuristic algorithm for grouping

const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));

const langGroup = [
    ['se', 'da', 'no'],
    ['es', 'pt'],
]

// sort desc, satisify big group first
if (argv._.length == 0) {
    console.warn("You must specify how to group the students");
    process.exit(1);
}
let conf = argv._[0].split(",").map(x=>{return parseInt(x)}).sort((a,b) => {
    return a>b ? -1 : (a == b ? 0 : 1)
});

let list = fs.readFileSync(argv.f || 'input.csv', 'utf8').split("\n");
let origin = [];
for (let i in list){
    if (list[i].length) {
        l = list[i].split(',');
        origin.push({
            name:l[0],
            lang:l[1],
            taken:false
        })
    }
}

let sum = conf.reduce(function(a, b) {
  return a + b;
}, 0);
if (sum != origin.length){
    console.warn("The group strategy does not match the number of students in the input file");
    process.exit(1);
}


function clone(a) {
   return JSON.parse(JSON.stringify(a));
}

function round(){
    let group = [];
    let totalScore = 0;
    let stu = clone(origin).sort(function() {
      return .5 - Math.random();
    });

    for (let c in conf){
        // loop of each group
        currentGroup = {score: 0, students: []}

        for (let i=0;i<conf[c];i++){
            // loop to add students
            let selected = null;
            let score = -1;
            for (let j in stu){
                let s = stu[j];
                if (s.taken) continue;

                let tmpScore = 0;
                for (let p in currentGroup.students){
                    // calculate all distance
                    tmpScore += (s.lang == currentGroup.students[p].lang) ? 0:1; // if speak different lang, then 1
                }
                if (tmpScore > score){
                    score = tmpScore;
                    selected = j;
                }
            }
            stu[selected].taken = true;
            currentGroup.score += score;
            currentGroup.students.push(stu[selected]);
        }
        group.push(currentGroup)
        totalScore += currentGroup.score;
    }
    return {
        group,
        totalScore
    }
}


let selectedGroup;
let maxScore = 0;
for (let i=0;i<(argv.r||3);i++){

    let g = round();
    if (g.totalScore > maxScore) {
        selectedGroup = g.group;
        maxScore = g.totalScore;
    }

}

console.log("total score: "+maxScore)
for (let g in selectedGroup){
    console.log(`==Group ${g}, score: ${selectedGroup[g].score} ==`);
    selectedGroup[g].students.forEach(s => {
        console.log(`${s.name}, ${s.lang}`)
    })
}
