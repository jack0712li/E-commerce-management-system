import mongoose from 'mongoose'; 

const dbConnection = async () => {
    try {
        mongoose.set("strictQuery", false);
        const connected = await mongoose.connect(process.env.MONGO_URL);

        console.log(`mongoDB connected ${connected.connection.host}`);
    }catch(error){
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }

};


export default dbConnection;

//fmcCtqxeOBQUnQ3v