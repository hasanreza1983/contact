const { mergeTypes } = require('merge-graphql-schemas');

const Contact = require('./contact')
const Group = require('./group');
const SharedDetails = require('./sharedDetails');
const serviceDetails = require('./serviceDetails')


const Queries = `

type Query {
  test(random: String): String
  getGroups(input:inputGetGroup) : getGroupsOutput,
  getSharedDetails(input:inputGetSharedDetails) : GetSHaredDetailsOutput
}

type err {
  key: String
  message: String
}

type Mutation {
  createContact(input: contactDetails!): Contact
  getContact(id_contact: Int): getContactDetails
  updateContact(id_contact: Int, data: contactData, email: updateEmail, phone: updatePhone): updateContactResult
  deleteContact(id_contact: Int!): deletedContactDetails
  createGroup(input:inputGroup) : createGroupOutput
  updateGroup(input:updateGroup) : updateGroupOutput
  removeGroup(input:removeGroup) : removeGroupOutput
  addSharedDetails(input:createSharedDetailsInput) : createSharedDetailsOutput
  removeSharedDetails(input:removeSharedGroupInput) : removeSharedGroupOutput
  serviceDetails(input: serviceDetails): serviceDetailsResult
}
`;

const types = [
    Contact,
    Group,
    SharedDetails,
    serviceDetails,
    Queries,
]


module.exports = mergeTypes(types);