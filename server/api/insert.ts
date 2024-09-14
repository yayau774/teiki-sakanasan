export default defineEventHandler(async () => {
  return await UserSchema.create({name: "Inu", email: "doggo@bow.wow"});
})