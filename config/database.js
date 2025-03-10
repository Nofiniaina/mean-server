const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connect = ()=> {
	mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}).then(()=> console.log("Database connected")).catch(err=>console.log(err));
}

exports.connect = connect;
