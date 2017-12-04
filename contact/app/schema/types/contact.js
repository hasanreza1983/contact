module.exports = `
  type Contact {
    details: Details,
    errors:  [err]
  }

  type Details {
    id_contact: Int,
    uid_ua_user: Int,
    title: String,
    fname: String,
    lname: String,
    intl_code: String,
    designation: String,
    department: String,
    organisation: String,
    group: [GrpMem],
    id_am_crm_subuser: Int,
    last_active_time: String,
    is_online: Int,
    status: Int,
    created_at: String,
    updated_at: String,
    contactEmail: [contactEmail],
    contactNumber: [contactNumber]
  }

  type GrpMem {
    id_group_member: Int,
    id_contact: Int,
    id_group: Int,
    created_at: String,
    updated_at: String
  }

  type contactEmail {
    id_contact_email: Int,
    id_contact: Int,
    email: String,
    status: Int,
    created_at: String,
    updated_at: String
  }

  type contactNumber {
    id_contact_phone: Int,
    id_contact: Int,
    phone: String,
    status: Int,
    created_at: String,
    updated_at: String
  }

  input contactDetails {
    uid_ua_user: Int!,
    title: String!,
    fname: String!,
    lname: String!,
    intl_code: String!,
    designation: String!,
    department: String!,
    organisation: String!,
    group: Int!,
    email_ids: [String]!,
    numbers: [String]!,
    id_am_crm_subuser: Int!
  }

  type deletedContactDetails {
    result: Result,
    errors: [err]
  }

  type Result {
    id_contact: Int,
    message: String
  }

  type getContactDetails {
    contact: [Details]
    errors: [err]
  }

  input contactData {
    uid_ua_user: Int,
    title: String,
    fname: String,
    lname: String,
    intl_code: String,
    designation: String,
    department: String,
    organisation: String,
    group: Int,
    id_am_crm_subuser: Int
  }

  input updateEmail {
    email: [Email]
  }

  input updatePhone {
    phone: [Phone]
  }

  input Email {
    id_contact_email: Int,
    email: String
  }

  input Phone {
    id_contact_phone: Int,
    phone: String
  }

  type updateContactResult {
    result: Result
    errors: [err]
  }


`
