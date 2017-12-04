module.exports = `
type SharedDetails {
  id_shared: Int,
  id_contact: Int,
  id_group: Int,
  from_uid: Int,
  to_uid: Int,
  status: Int,
  created_at: String,
  updated_at: String
}

input createSharedDetailsInput {
    id_contact: [Int],
    id_group: [Int],
    from_uid: Int,
    to_uid: [Int],
    shared_type:Int,
}
input removeSharedGroupInput{
  id_shared:Int!
}

input inputGetSharedDetails{
  from_uid:Int, 
  shared_type:Int,
  page:Int
}


type GetSHaredDetailsOutput{
  details: [SharedDetails]
  page:Int,
}

type createSharedDetailsOutput {
  details: [SharedDetails]
  status:String
}

type removeSharedGroupOutput {
  status:String
}

`;