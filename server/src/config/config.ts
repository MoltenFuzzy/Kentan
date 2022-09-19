import dotenv from "dotenv";

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@kentancluster.jtoergz.mongodb.net/kentanDB?retryWrites=true&w=majority`;
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

export const config = {
	mongo: {
		url: MONGO_URI,
	},
	server: {
		port: PORT,
	},
};
