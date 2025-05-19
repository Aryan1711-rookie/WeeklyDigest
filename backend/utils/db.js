import mongoose from 'mongoose';
const connectDB = async (req,res) => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected");
    }
    catch(error){
        console.log("Something went wrong while connecting to the database => ", error);
    }
};
export default connectDB;