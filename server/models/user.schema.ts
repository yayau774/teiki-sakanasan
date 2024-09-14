import { defineMongooseModel } from '#nuxt/mongoose'

// import { hash } from 'bcrypt'

export const UserSchema = defineMongooseModel({
  name: 'User',
  schema: {
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
  },
  options: {
    collection: 'User',
  },
  hooks(schema) {
  },
})
