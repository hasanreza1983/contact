module.exports = `
type Group {
  group_id: Int,
  group_name: String,
  uid: Int,
  status: Int,
  created_at: String,
  updated_at: String
}

input inputGetGroup {
  group_id: Int,
  page: Int
}

input inputGroup {
    group_name: String!,
    uid: Int!
}
input updateGroup {
  group_id: Int!,
  group_name: String!  
}
input removeGroup{
  group_id:Int
}

type getGroupsOutput{
  details: [Group],
  errors: [err],
  page:Int
}

type createGroupOutput {
  details: Group,
  errors: [err],
  status:String
}

type updateGroupOutput {
  details: Group,
  errors: [err],
  status:String
}
type removeGroupOutput {
  errors: [err],
  status:String
}

`;