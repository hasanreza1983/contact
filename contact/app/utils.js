var validator = require('validator');
const { formatError } = require('graphql');

const checkData = (key, object) => {
    var pattern = /[^a-z|^A-Z|^\s]/;
    const { validation } = object;
    value = object.value;

    if (validation.required) {
        if (value == "") {
            return { message: `${object.label} must not be empty`, key };
        }
    }


    if (validation.isEmail && object.value.length > 0) {
        if (!validator.isEmail(object.value)) {
            return { message: `${object.label} must be an email format`, key };
        }
    }


    if (validation.isInteger && object.value.length > 0) {
        if (!validator.isInt(object.value)) {
            return { message: `${object.label} must be integer only`, key };
        }
    }


    if (validation.isAlpha && object.value.length > 0) {
        if (value.match(pattern)) {
            return { message: `${object.label} must be string only`, key };
        }
    }


    if (validation.checkLength && object.value.length > 0) {
        const len = object.value.length;
        const { maxlength, minlength } = object.range;
        if ((len > maxlength) || (len < minlength)) {
            return { key, message: `Length of ${object.label} must be between ${minlength} and ${maxlength} characters` };
        }
    }
    return null;
}

// Constant message 
const ErrorMessages = {
    dbError: "Database Error",

}

class CustomError extends Error {
    constructor(message, field, maaKiAnkh) {
        super(message);
        this.field = field;
        this.maaKiAnkh = maaKiAnkh;
    }
}

const formatErr = error => {
    const data = formatError(error);
    const { originalError } = error;
    data.field = originalError && originalError.field
    return data;
};

module.exports = { checkData, ErrorMessages, formatErr, CustomError };