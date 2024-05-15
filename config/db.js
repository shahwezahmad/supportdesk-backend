const mongoose  = require('mongoose')

const connectDB = async () => {

    try {
    let conn =  await  mongoose.connect(process.env.MONGODB_URL)
        console.log(`connect on port ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = {connectDB}
