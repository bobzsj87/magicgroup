'use strict'
const extend = require('util')._extend;

// build a list of students, to be ready for round robin
// order by simularity cluster desc
// student = {name, feature}
// featureGroup = [[f1, f2]]
function buildList(stuList, featureGroup){
    featureGroup = featureGroup || []; // just for node 4.3.2 in Lambda
    let f = featureGroup.slice(); // copy
    let groups = {}, ret = [];
    stuList.forEach(s => {
        let i;
        for (i=0;i<f.length;i++){
            if (f[i] && f[i].indexOf(s.feature) >= 0) break;
        }
        if (!f.length) f.push([s.feature])
        else if (i == f.length) f[i] = [s.feature]; // no match

        if (!groups[i]) groups[i] = []; // init list
        groups[i].push(s);
    })

    let sorted = Object.keys(groups).map(key => groups[key]).sort((a,b)=>{
        return a.length>b.length?-1:(a.length==b.length?0:1);
    });

    for (let i in sorted){
        ret = ret.concat(sorted[i]);
    }
    return ret;
}

function roundRobind(studentList, numOfGroup){
    numOfGroup = numOfGroup || 1;
    let cursor = 0, ret = [];
    for (let s in studentList){
        if (!ret[cursor]) ret[cursor] = [];
        ret[cursor].push(studentList[s]);
        cursor = (cursor + 1) % numOfGroup;
    }
    return ret;
}

function group(stuList, numOfGroup, featureGroup){
    let digested = buildList(stuList, featureGroup);
    return roundRobind(digested, numOfGroup);
}

function parseCSV(raw){
    let list = raw.split("\n");
    let rawStuList = [];
    list.forEach(l => {
        if (l.length) {
            let lsp = l.split(',');
            rawStuList.push({
                name:lsp[0],
                feature:lsp[1]
            })
        }
    })
    return rawStuList;
}

module.exports = {
    buildList, roundRobind, group, parseCSV
}
