import dotenv from 'dotenv';
dotenv.config();
const dbUrl = process.env.MONGO_URL;
const port = process.env.PORT;

console.log(dbUrl)
console.log(port)



