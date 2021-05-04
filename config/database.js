const mongoose = require('mongoose')

// const options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex : true,
//     useFindAndModify : false
// }
//
// mongoose
//     .connect(process.env.MONGODB_URI, options)
//     .then(_ => console.log("connected mongodb..."))
//     .catch(err => console.log(err))

connectDB = async function(){

    try{

        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex : true,
            useFindAndModify : false
        })

        console.log("connected mongodb...")
    }catch(err){
        console.log(err.message)
        process.exit(1)
    }
}

module.exports = connectDB