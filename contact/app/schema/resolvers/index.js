const { mergeResolvers } = require('merge-graphql-schemas');

const Contact = require('./contact')
const Group = require('./group');
const SharedDetails = require('./sharedDetails');
const serviceDetails = require('./serviceDetails')

const resolvers = [
    Contact,
    Group,
    SharedDetails,
    serviceDetails,
    {}
]

//model.ampDb.query('SELECT * from contactEmails eml LEFT JOIN Contact cc on eml.cid=cc.cid where cc.user_id=req.user_id and eml.email_id in("sdfsd@asdas.com","fhdh@fdf.com")', (type:model.ampDb.))


module.exports = mergeResolvers(resolvers);