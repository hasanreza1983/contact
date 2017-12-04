/*
@Author : sanjay Verma
@Date : 24/11/2017
*/
const model = require('../../models');
//const validator = require('validator');
//const commonVal = require('../../validation/common_validate');
const validation = require('../../validation/shareDetailsValidation');
const Op = model.Sequelize.Op;
const limit = 10; // 10 records fetch 


module.exports = {
    Query: {
        getSharedDetails: async(obj, args, context, info) => {

            var paramArr = {};
            let sharedGroupArr = [];
            let ErrorArr = [];
            let status = '';
            let condition = '';
            let share_type_column = '';

            // Prepare array to validate fields
            if (args.input.from_uid) {
                paramArr['from_uid'] = args.input.from_uid;
                condition = { from_uid: args.input.from_uid };
            }
            if (args.input.shared_type) { // 1= Contact, 2=Group
                paramArr['shared_type'] = args.input.shared_type;
            }
            if (typeof args.input.page == 'undefined') { // 1= Contact, 2=Group
                args.input.page = 0;
            }
            paramArr['page'] = args.input.page;
            condition['status'] = 1;

            // Validate prepared array
            ErrorArr = validation.validategetSharedDetails(paramArr);
            // validate Keys
            if (ErrorArr.error != null) {
                throw new Error(ErrorArr.error.details[0].message);
            } else {
                // Process the API
                try {

                    share_type_column = (args.input.shared_type == 1) ? 'id_contact' : 'id_group';
                    condition[share_type_column] = {
                        [Op.ne]: [0]
                    };
                    sharedGroupArr = await model.SharedDetails.findAll({ where: condition, offset: args.input.page * 10, limit: limit });
                    return { details: sharedGroupArr, page: args.input.page };
                } catch (err) {
                    throw new Error(err);
                }
            }
        },


        // Query END
    },
    Mutation: {
        addSharedDetails: async(obj, args, context, info) => { // Muttion for shared groups to users
            let insObj = [];
            let sharedGroupObj = [];
            let ErrorArr = [];
            let paramArr = {};
            let status = '';
            let share_type_column = (args.input.shared_type == 1) ? 'id_contact' : 'id_group'; // From this, we will get to know wether we have to share contacts or group

            // Validate prepared array
            paramArr[share_type_column] = args.input[share_type_column];
            paramArr['to_uid'] = args.input.to_uid;
            paramArr['from_uid'] = args.input.from_uid;
            paramArr['shared_type'] = args.input.shared_type;

            // Validate request
            ErrorArr = validation.validateaddSharedDetails(paramArr);
            // validate Keys
            if (ErrorArr.error != null) {
                throw new Error(ErrorArr.error.details[0].message);
            }

            //create a batch for insert multiple data at one go
            if (args.input[share_type_column].length && args.input.to_uid.length) {
                for (var i = 0; i < args.input[share_type_column].length; i++) {
                    for (var j = 0; j < args.input.to_uid.length; j++) {
                        // Check whether user is already shared
                        if (share_type_column == 'id_contact') { // find id_contact into DB
                            let result = await model.SharedDetails.findOne({ where: { id_contact: args.input.id_contact[i], to_uid: args.input.to_uid[j], status: 1 } })
                            if (result) { // Already shared, no insertation arther than return an already exist error
                                throw new Error(args.input.id_contact[i] + " is already shared " + ' with ' + args.input.to_uid[j]);
                            } else { // make insertation batch for save shared details
                                insObj.push({ id_contact: args.input.id_contact[i], from_uid: args.input.from_uid, to_uid: args.input.to_uid[j], created_at: new Date(), updated_at: new Date() });
                            }
                        } else { // find id_group into DB
                            let result = await model.SharedDetails.findOne({ where: { id_group: args.input.id_group[i], to_uid: args.input.to_uid[j], status: 1 } })
                            if (result) { // Already shared, no insertation arther than return an already exist error
                                // ErrorArr.push({ 'key': 'id_group', 'message': args.input.id_group[i] + statuscode.alreadyShared + ' with ' + args.input.to_uid[j] });
                                throw new Error(args.input.id_group[i] + ' is already shared' + ' with ' + args.input.to_uid[j]);
                            } else { // make insertation batch for save shared details
                                insObj.push({ id_group: args.input.id_group[i], from_uid: args.input.from_uid, to_uid: args.input.to_uid[j], created_at: new Date(), updated_at: new Date() });
                            }
                        }
                    }
                }
            }

            // Process the API
            try {
                sharedGroupObj = await model.SharedDetails.bulkCreate(insObj) // insert the batch
                if (sharedGroupObj) {
                    let type = (share_type_column == 'id_contact') ? 'Contact' : 'Group';
                    status = type + ' has been shared statusfully.';
                    return { details: sharedGroupObj, status: status };
                }
            } catch (err) {
                throw new Error(err);
            }

        },

        removeSharedDetails: async(obj, args, context, info) => { // Muttion for remove the group by group id
            let groupObj = {};
            let ErrorArr = [];
            let status = '';
            //let share_type_column = (args.input.shared_type == 1) ? 'id_contact' : 'id_group';

            // Validate request
            ErrorArr = validation.validateRemSharedDetails({ id_shared: args.input.id_shared });
            // validate Keys
            if (ErrorArr.error != null) {
                throw new Error(ErrorArr.error.details[0].message);
            } else {
                // Process the API
                try {
                    let result = await model.SharedDetails.findOne({ where: { id_shared: args.input.id_shared, status: 1 } });
                    if (result) { // record found
                        let is_update = await model.SharedDetails.update({ status: 0 }, {
                            where: {
                                id_shared: args.input.id_shared
                            }
                        })
                        if (is_update) {
                            status = 'Record has been removed statusfully.';
                        }
                    } else { // record not found.
                        throw new Error(args.input.id_shared + " does not exist");
                    }
                } catch (err) {
                    throw new Error(err);
                }
            }
            return { status: status };
        },

        // Mutation END
    }
}