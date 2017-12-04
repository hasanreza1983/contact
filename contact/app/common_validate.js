// @author : Sanjay Verma
// @date : 04/11/2017
// @des : validate field, Its is a common class
let statuscode = require('./statusmessage');
let validator = require('validator');

module.exports.commonvalidate = (req, paramArr) => {
    let errorArr = [];
    let errorKeys = [];
    for (let index in paramArr) {
        if (paramArr.length > 0) {
            for (let key in paramArr[index]) {
                if (errorKeys.indexOf(key) == -1) {
                    if (paramArr[index][key] == 'isCustomEmpty') {
                        if (req[key] == '') {
                            errorKeys.push(key);
                            errorArr.push({ 'key': key, 'message': key + statuscode[paramArr[index][key]] });
                        }
                    } else if (paramArr[index][key] == 'isEmpty') {
                        if (validator[paramArr[index][key]](req[key])) {
                            errorKeys.push(key);
                            errorArr.push({ 'key': key, 'message': key + statuscode[paramArr[index][key]] });
                        }
                    } else if (paramArr[index][key] == 'isLength') {
                        if (!validator[paramArr[index][key]](req[key], { min: 1, max: 50 })) {
                            errorKeys.push(key);
                            errorArr.push({ 'key': key, 'message': key + statuscode[paramArr[index][key]] });
                        }
                    } else if (paramArr[index][key] == 'isNumeric') {
                        if (isNaN(req[key])) {
                            errorKeys.push(key);
                            errorArr.push({ 'key': key, 'message': key + statuscode[paramArr[index][key]] });
                        }
                    } else {
                        if (!validator[paramArr[index][key]](req[key])) {
                            errorKeys.push(key);
                            errorArr.push({ 'key': key, 'message': key + statuscode[paramArr[index][key]] });
                        }
                    }
                }
            }
        }
    }
    return errorArr;
}