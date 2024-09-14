export default defineEventHandler(async (event) => {
  return await UserSchema.find({})
})