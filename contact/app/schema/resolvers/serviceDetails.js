const model = require('../../models')

module.exports = {
  Mutation: {
    serviceDetails: async (obj, args, context, info) => {
      let output = {}
      output.result = {}
      output.errors = []
      let data = []
      args.input.id_service.forEach(serviceId => {
        let obj = {}
        obj.id_contact = args.input.id_contact
        obj.to_uid = args.input.to_uid
        obj.id_group = args.input.id_group
        obj.id_service = serviceId
        obj.is_shared = args.input.is_shared
        obj.status = 1
        obj.created_at = new Date()
        obj.updated_at = new Date()
        data.push(obj)
      })
      let result = await model.serviceDetails.bulkCreate(data)
      console.log('result', result)
      if(result) {
        output.result = {
          key: 'success',
          message: 'Services assigned '
        }
        return output
      }
    },
  }
}
