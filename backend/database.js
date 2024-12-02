import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export default () => {
    mongoose
        .connect(process.env.DATABASE_URL)
        .then(() => console.log('DB OK'))
        .catch((err) => console.log(err));
};
