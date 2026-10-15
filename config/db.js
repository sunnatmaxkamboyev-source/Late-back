const mongoose = require("mongoose")

const connectDB = async () =>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)

        console.log(
            `MongoDB ulandi ${connection.connection.host}`
        )
    } catch (error) {
        console.error("MongoDB ulanishda xatolik", error.message);
        process.exit(1)
        
    }
}

module.exports = connectDB