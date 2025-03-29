const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config();

/* 
	Uncomment the below code to connect to local MongoDB
*/

// const connect = ()=> {
// 	mongoose.connect(process.env.MONGO_URI, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true
// 	}).then(()=> console.log("Database connected")).catch(err=>console.log(err));
// }

/*  
	Uncomment the below code to connect to MongoDB Atlas
*/
const connect = ()=> {
	mongoose.connect(process.env.MONGO_CLUSTER_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}).then(()=> console.log("Database connected")).catch(err=>console.log(err));
}


exports.connect = connect;
