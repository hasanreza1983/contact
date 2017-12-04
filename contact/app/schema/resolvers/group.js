/*
@Author : sanjay Verma
@Date : 20/11/2017
*/
const model = require('../../models');
//const validator = require('validator');
//const commonVal = require('../../validation/common_validate');
const validation = require('../../validation/groupValidation');
const Op = model.Sequelize.Op;
const limit = 10; // 10 records fetch 

module.exports = {
    Query: {
        getGroups: async(obj, args, context, info) => {
            // Prepare array to validate fields
            var paramArr = {};
            let groupObj = [];
            let ErrorArr = [];
            let condition = '';

            if (args.input.group_id) {
                paramArr['group_id'] = args.input.group_id;
                condition = { group_id: args.input.group_id };
            }
            if (typeof args.input.page == 'undefined') {
                args.input.page = 0;
            } else {
                paramArr['page'] = args.input.page;
            }
            condition['status'] = 1;

            // Validate request
            ErrorArr = validation.validategetGroups(paramArr);
            // validate Keys
            if (ErrorArr.error != null) {
                throw new Error(ErrorArr.error.details[0].message);
            } else {
                // Process the API
                try { // may be get exeption, that why taking under try
                    groupObj = await model.Group.findAll({ where: condition, offset: args.input.page * 10, limit: limit });
                    return { details: groupObj, errors: ErrorArr, page: args.input.page };
                } catch (err) { // Handle exception if get any
                    return new Error(err);
                }
            }
        },

        // Query END
    },
    Mutation: {
        createGroup: async(obj, args, context, info) => { // Muttion for create the group by group id
            // Prepare array to validate fields
            let groupObj = {};
            let ErrorArr = [];
            let status = '';
            // Validate prepared array
            ErrorArr = validation.validateCreateGroup({ group_name: args.input.group_name, uid: args.input.uid });
            // validate Keys
            try {
                if (ErrorArr.error != null) {
                    throw new Error(ErrorArr.error.details[0].message);
                } else {
                    // Process the API
                    groupObj = await model.Group.findOrCreate({ where: { group_name: args.input.group_name }, defaults: { group_name: args.input.group_name, uid: args.input.uid, created_at: new Date(), updated_at: new Date() } })
                        .spread((result, is_created) => {
                            if (is_created) {
                                status = 'Group has been saved successfully.';
                                return result.dataValues;
                            } else {
                                throw new Error('Group name is already exist');
                            }
                        })
                }
            } catch (err) {
                throw err;
            }

            return { details: groupObj, status: status };
        },
        updateGroup: async(obj, args, context, info) => { // Muttion for update the group by group id
            let groupObj = {};
            let ErrorArr = [];
            let status = '';

            // Validate request
            ErrorArr = validation.validateUpdateGroup({ group_name: args.input.group_name, group_id: args.input.group_id });
            // validate Keys
            if (ErrorArr.error != null) {
                throw new Error(ErrorArr.error.details[0].message);
            } else {
                // Process the API
                groupObj = await model.Group.findOne({
                    where: {
                        status: 1,
                        group_name: {
                            [Op.eq]: [args.input.group_name]
                        }
                    }
                });
                if (!groupObj) { // Can't find the group by group ID, then update
                    try {
                        let is_update = await model.Group.update({ group_name: args.input.group_name }, { where: { group_id: args.input.group_id } })
                        if (is_update) {
                            status = 'Group has been update successfully.';
                        }
                    } catch (err) {
                        throw new Error(err);
                    }
                } else { // GROUP Exist
                    throw new Error("Group name is already exist");
                }
            }
            return { details: groupObj, status: status };
        },
        removeGroup: async(obj, args, context, info) => { // Muttion for remove the group by group id
            let groupObj = {};
            let ErrorArr = [];
            let status = '';
            // Validate request
            ErrorArr = validation.validateRemoveGroup({ group_id: args.input.group_id });
            // validate Keys
            if (ErrorArr.error != null) {
                throw new Error(ErrorArr.error.details[0].message);
            } else {
                // Process the API
                try {
                    groupObj = await model.Group.findOne({ where: { group_id: args.input.group_id, status: 1 } })
                    if (groupObj) { // GROUP Exist
                        let is_remove = await model.Group.update({ status: 0 }, { where: { group_id: args.input.group_id } })
                        if (is_remove) {
                            status = 'Group has been removed successfully.';
                        }

                    } else { // Can't find the group by group ID
                        throw new Error("Group does not exist");
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