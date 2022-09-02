import mongoose from "mongoose" ;
import { config } from "./config";

module.exports = async () => {
	try {
		const conn = await mongoose.connect(config.mongo.url);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

