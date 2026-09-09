import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB is connected successfully`);
    } catch (error) {
        console.log(`Error: ${(error as Error).message}`);
        process.exit(1);//..??
    }
}
export default connectDB;