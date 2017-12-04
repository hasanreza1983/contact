const Joi = require('joi');
//const { makeErrorArray } = require('../config/utils');
let ErrorArr = [];

/********************************************** Starts: Validation schema  ***************************************************/

// Make Schema for validate schemaGetCostRate
let schemaGetGroups = Joi.object().keys({
    group_id: Joi.number(),
    page: Joi.number()
});


// Make Schema for validate schemaCreateGroup
let schemaCreateGroup = Joi.object().keys({
    group_name: Joi.string().required(),
    uid: Joi.number().required()
});


// Make Schema for validate schemaCreateGroup
let schemaupdateGroup = Joi.object().keys({
    group_name: Joi.string().required(),
    group_id: Joi.number().required()
});


// Make Schema for validate schemaRemoveGroup
let schemaRemoveGroup = Joi.object().keys({
    group_id: Joi.number().required()
});
/********************************************** Starts: Validation function  ***************************************************/

// function for validate scheme validategetGroups
const validategetGroups = (ServiceTypeInput) => { // Validate addServicetype API
    return Joi.validate(ServiceTypeInput, schemaGetGroups, { abortEarly: true });
}

// function for validate scheme validateCreateGroup
const validateCreateGroup = (ServiceTypeInput) => { // Validate validateCreateGroup API
    return Joi.validate(ServiceTypeInput, schemaCreateGroup, { abortEarly: true });
}

// function for validate scheme validateupdateGroup
const validateUpdateGroup = (ServiceTypeInput) => { // Validate validateAddSalesRateInput API
    return Joi.validate(ServiceTypeInput, schemaupdateGroup, { abortEarly: true });
}

// function for validate scheme validateRemoveGroup
const validateRemoveGroup = (ServiceTypeInput) => { // Validate validateAddSalesRateInput API
    return Joi.validate(ServiceTypeInput, schemaRemoveGroup, { abortEarly: true });
}



module.exports = {
    validategetGroups,
    validateCreateGroup,
    validateUpdateGroup,
    validateRemoveGroup
}