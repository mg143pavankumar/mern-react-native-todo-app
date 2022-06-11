import mongoose from 'mongoose'


export const connectDatabase = async () => {
   try{
    const {connection} = await mongoose.connect(process.env.MONGO_URI)

    console.log(`MongoDB Connected: ${connection.host}`)
   }catch(err){
    console.log(err)
    process.exit(1)
   }
}