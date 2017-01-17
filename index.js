// for AWS Lambda
'use strict';
const core = require('./core.js');

exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    switch (event.httpMethod) {
        case 'GET':
            done(new Error(`Use POST`));
            break;
        case 'POST':
            if (event.body.length){
                let rawStuList = core.parseCSV(event.body);
                let ret = core.group(rawStuList, event.queryStringParameters.groupnum);
                done(null, ret)
            }
            else{
                done(new Error('No body'));
            }

            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};
