module.exports = `

input serviceDetails {
  id_contact: Int,
  to_uid: Int!,
  id_group: Int,
  id_service: [Int]!,
  is_shared: Int!
}

type serviceDetailsResult {
  result: outputMessage,
  errors: [err]
}

type outputMessage {
  key: String,
  message: String
}

`;
