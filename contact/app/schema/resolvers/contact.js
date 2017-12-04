const model = require('../../models');
const Op = model.Sequelize.Op;
const validator = require('validator');
//const commonVal = require('../../common_validate');
//const statuscode = require('../../statuscode');

const modifyEmail = async emails => {
    for (let i = 0; i < emails.length; i++) {
        let update = await model.contactEmail.update({
            email: emails[i].email,
            status: 1,
            updated_at: new Date()
        }, {
            where: {
                id_contact_email: emails[i].id_contact_email
            }
        })
        console.log('update email result', i, update)
    }
    return 1
}

const modifyPhNum = async numbers => {
    for (let i = 0; i < numbers.length; i++) {
        let update = await model.contactNumber.update({
            phone: numbers[i].phone,
            status: 1,
            updated_at: new Date()
        }, {
            where: {
                id_contact_phone: numbers[i].id_contact_phone
            }
        })
        console.log('update phone result', i, update)
    }
    return 1
}

module.exports = {

    Query: {
        test: async(obj, args, context, info) => {
            console.log('12121', args)
            return args.random
        }
    },


    Mutation: {
        createContact: async(obj, args, context, info) => {
            const { uid_ua_user, title, fname, lname, intl_code, designation, department, organisation, group, id_am_crm_subuser, email_ids, numbers } = args.input;
            let paramArr = []
            let ErrorArr = []
            let createContact = {}
            createContact.details = {}
            createContact.errors = []
            paramArr.push({ 'uid_ua_user': 'isCustomEmpty' })
            paramArr.push({ 'title': 'isEmpty' })
            paramArr.push({ 'fname': 'isEmpty' })
            createContact.errors = commonVal.commonvalidate(args.input, paramArr);

            if (createContact.errors.length > 0) {
                console.log('if', createContact)
                    //return createContact
                    //return { errors: ErrorArr };
            } else {
                console.log('21212', { uid_ua_user, title, fname, lname, intl_code, designation, department, organisation, group, id_am_crm_subuser, email_ids, numbers })

                let cEmails = await model.contactEmail.find({
                    include: [{
                        model: model.Contact,
                        required: false,
                        attributes: [],
                        where: {
                            uid_ua_user: args.input.uid_ua_user
                        }
                    }],
                    attributes: ['email'],
                    where: {
                        email: {
                            [Op.in]: [args.input.email_ids]
                        },

                    }
                })
                console.log('email', cEmails)
                if (!cEmails) {
                    console.log('email does not exist')
                    let cNumbers = await model.contactNumber.findAll({
                            include: [{
                                model: model.Contact,
                                required: false,
                                attributes: [],
                                where: {
                                    uid_ua_user: args.input.uid_ua_user
                                }
                            }],
                            attributes: ['phone'],
                            where: {
                                phone: {
                                    [Op.in]: [args.input.numbers]
                                },

                            }
                        })
                        //console.log('number', cNumbers)
                    if (!cNumbers) {
                        console.log('number does not exist')
                        let emails = [],
                            numbers = []
                        args.input.email_ids.forEach(email => {
                            console.log('******', email)
                            let obj = {}
                            obj.email = email
                            obj.status = 1
                            obj.created_at = new Date()
                            obj.updated_at = new Date()
                            emails.push(obj)
                        })

                        args.input.numbers.forEach(number => {
                            let obj = {}
                            obj.phone = number
                            obj.status = 1
                            obj.created_at = new Date()
                            obj.updated_at = new Date()
                            numbers.push(obj)
                        })

                        console.log('email array', emails)
                        console.log('number array', numbers)
                        console.log({ grpMem: { id_group: args.input.group } })
                            // add contact
                        let result = await model.Contact.create({ uid_ua_user, title, fname, lname, intl_code, designation, department, organisation, id_am_crm_subuser, status: 1, is_online: 1, last_active_time: new Date(), grpMem: { id_group: args.input.group, status: 1, created_at: new Date(), updated_at: new Date() }, emails: emails, numbers: numbers, created_at: new Date(), updated_at: new Date() }, {
                            include: [{
                                model: model.contactEmail,
                                as: 'emails'
                            }, {
                                model: model.contactNumber,
                                as: 'numbers'
                            }, {
                                model: model.groupMember,
                                as: 'grpMem'
                            }]
                        })
                        console.log('4444', result.dataValues)
                        if (result) {
                            //console.log('2222', result.dataValues.grpMem)
                            let details = {}
                            details = result.dataValues
                            details.contactEmail = []
                            details.contactNumber = []
                            details.groupMember = []
                            details.groupMember.push(result.dataValues.grpMem.dataValues)
                            if (result.dataValues.emails) {
                                result.dataValues.emails.forEach(emailData => {
                                    details.contactEmail.push(emailData.dataValues)
                                })
                            }
                            if (result.dataValues.numbers) {
                                result.dataValues.numbers.forEach(numberData => {
                                    details.contactNumber.push(numberData.dataValues)
                                })
                            }
                            createContact.details = details
                            console.log('2323232323q3232', createContact)
                            return createContact
                        }
                    } else {
                        // contact already exists
                        createContact.errors.push({
                            key: 'phone number',
                            message: 'Phone Number already exists'
                        })
                        return createContact
                    }

                } else {
                    // contact already exists
                    createContact.errors.push({
                        key: 'email',
                        message: 'Email already exists'
                    })
                    console.log('####', createContact.errors)
                    return createContact
                }
            }
        },

        updateContact: async(obj, args, context, info) => {
            console.log('args', args.data, args.phone)
            let contact = {}
            contact.result = {}
            contact.errors = []
            let result = await model.Contact.find({ where: { id_contact: args.id_contact } })
            if (result) {
                let update = model.Contact.update(args.data, { where: { id_contact: args.id_contact } })
                if (update) {
                    if (args.email.email) {
                        let emails = args.email.email
                        let updateEmail = []
                        let insertEmail = []
                        emails.forEach(email => {
                            if (email.id_contact_email) {
                                updateEmail.push(email)
                            } else {
                                let obj = {}
                                obj.email = email.email
                                obj.status = 1
                                obj.id_contact = args.id_contact
                                obj.created_at = new Date()
                                obj.updated_at = new Date()
                                insertEmail.push(obj)
                            }
                        })
                        console.log('emails array', updateEmail, insertEmail)
                        if (updateEmail) {
                            const modifiedEmails = await modifyEmail(updateEmail)
                            console.log(modifiedEmails)
                        }
                        if (insertEmail) {
                            const newEmails = await model.contactEmail.bulkCreate(insertEmail)
                            console.log('insert email result', newEmails)
                        }
                    }
                    if (args.phone.phone) {
                        let phNum = args.phone.phone
                        let updatePhNum = []
                        let insertPhNum = []
                        phNum.forEach(number => {
                            if (number.id_contact_phone) {
                                updatePhNum.push(number)
                            } else {
                                let obj = {}
                                obj.phone = number.phone
                                obj.status = 1
                                obj.id_contact = args.id_contact
                                obj.created_at = new Date()
                                obj.updated_at = new Date()
                                insertPhNum.push(obj)
                            }
                        })
                        console.log('numbers array', updatePhNum, insertPhNum)
                        if (updatePhNum) {
                            const modifiedPhNum = await modifyPhNum(updatePhNum)
                            console.log(modifiedPhNum)
                        }
                        if (insertPhNum) {
                            const newPhNum = await model.contactNumber.bulkCreate(insertPhNum)
                            console.log('insert numbers result', newPhNum)
                        }
                    }
                    contact.result = {
                        id_contact: args.id_contact,
                        message: "Contact updated successfully"
                    }
                    return contact
                }
            } else {
                contact.errors.push({
                    key: 'contact',
                    message: 'Contact does not exist'
                })
                return contact
            }

        },

        deleteContact: async(obj, args, context, info) => {
            console.log('input', args.id_contact, typeof(args.id_contact))
            let deletedContactDetails = {}
            deletedContactDetails.result = {}
            deletedContactDetails.errors = []

            let contact = await model.Contact.find({ where: { id_contact: args.id_contact } })
            console.log('contact result', contact)
            if (!contact) {
                let p1 = model.Contact.update({ status: 0 }, { where: { id_contact: args.id_contact } })
                let p2 = model.contactEmail.update({ status: 0 }, { where: { id_contact: args.id_contact } })
                let p3 = model.contactNumber.update({ status: 0 }, { where: { id_contact: args.id_contact } })
                let p4 = model.groupMember.update({ status: 0 }, { where: { id_contact: args, id_contact } })

                return Promise.all([p1, p2, p3, p4])
                    .then(data => {
                        console.log('promises result', data, deletedContactDetails)
                        deletedContactDetails.result = {
                            id_contact: args.id_contact,
                            message: "Contact deleted successfully"
                        }
                        return deletedContactDetails
                    })
                    .catch(err => {
                        console.log('promise error', err)
                        deletedContactDetails.errors.push({
                            key: 'DB',
                            message: 'Database error'
                        })
                        return deletedContactDetails
                    })
            } else {
                deletedContactDetails.errors.push({
                    key: 'contact',
                    message: 'Contact does not exist'
                })
                console.log(deletedContactDetails)
                return deletedContactDetails
            }
        },

        getContact: async(obj, args, context, info) => {
            let getContactDetails = {}
            getContactDetails.result = {}
            getContactDetails.errors = []
            let cond = {}
            if (args.id_contact) {
                cond = { where: { id_contact: args.id_contact, status: 1 } }
            } else {
                cond = { where: { status: 1 } }
            }
            let p1 = model.Contact.findAll(cond)
            let p2 = model.contactEmail.findAll(cond)
            let p3 = model.contactNumber.findAll(cond)
            let p4 = model.groupMember.findAll(cond)
            let output = {}
            output.contact = []
            output.errors = []
            return Promise.all([p1, p2, p3, p4])
                .then(promiseData => {
                    promiseData[0].forEach(contact => {
                        console.log(contact.dataValues)
                        let data = {}
                        data = contact.dataValues
                        data.contactEmail = []
                        data.contactNumber = []
                        data.group = []
                            //console.log('adadadea', obj)
                        promiseData[1].forEach(contactEmail => {
                            if (data.id_contact === contactEmail.dataValues.id_contact) {
                                data.contactEmail.push(contactEmail.dataValues)
                            }
                        })
                        promiseData[2].forEach(contactNumber => {
                            if (data.id_contact === contactNumber.dataValues.id_contact) {
                                data.contactNumber.push(contactNumber.dataValues)
                            }
                        })
                        promiseData[3].forEach(groupMember => {
                            if (data.id_contact === groupMember.dataValues.id_contact) {
                                data.group.push(groupMember.dataValues)
                            }
                        })
                        output.contact.push(data)
                    })
                    console.log('final data', output.contact)
                    return output
                })
                .catch(error => {
                    console.log('error', error)
                    return output
                })
        },
    }
}