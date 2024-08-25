import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import UserRoute from './routes/userRoute.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(UserRoute)


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});