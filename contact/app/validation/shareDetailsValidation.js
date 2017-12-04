const Joi = require('joi');
//const { makeErrorArray } = require('../config/utils');
let ErrorArr = [];

/********************************************** Starts: Validation schema  ***************************************************/

// Make Schema for validate schemaGetCostRate
let schemaGetSharedDetails = Joi.object().keys({
    from_uid: Joi.number(),
    shared_type: Joi.number().valid(1, 2).required(),
    page: Joi.number().required()
});


// Make Schema for validate schemaAddCostRate
let schemaaddSharedDetails = Joi.object().keys({
    id_contact: Joi.array().items(Joi.number()),
    id_group: Joi.array().items(Joi.number()),
    from_uid: Joi.number().required(),
    to_uid: Joi.array().items(Joi.number().required()),
    shared_type: Joi.number().valid(1, 2).required()
});

// Make Schema for validate schemaRemSharedDetails
let schemaRemSharedDetails = Joi.object().keys({
    id_shared: Joi.number().required()
});



/********************************************** Starts: Validation function  ***************************************************/

// function for validate scheme validateGetCostRateInput
const validategetSharedDetails = (ServiceTypeInput) => { // Validate addServicetype API
    console.log(ServiceTypeInput);
    return Joi.validate(ServiceTypeInput, schemaGetSharedDetails, { abortEarly: true });
}

// function for validate scheme validateaddSharedDetails
const validateaddSharedDetails = (ServiceTypeInput) => { // Validate schemaaddSharedDetails API
    console.log(ServiceTypeInput);
    return Joi.validate(ServiceTypeInput, schemaaddSharedDetails, { abortEarly: true });
}

// function for validate scheme validateRemCostRateInput
const validateRemSharedDetails = (ServiceTypeInput) => { // Validate schemaRemSharedDetails API
    return Joi.validate(ServiceTypeInput, schemaRemSharedDetails, { abortEarly: true });
}



module.exports = {
    validategetSharedDetails,
    validateaddSharedDetails,
    validateRemSharedDetails
}