import express from 'express';
import cors from 'cors';
import connectToDatabase from './database.js';
import { UserRouter, PostRouter, UploadRouter } from './routers/index.js';

connectToDatabase();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use('/auth', UserRouter);
app.use('/posts', PostRouter);
app.use('/upload', UploadRouter);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`\x1b[1;42mServer OK\x1b[0;1m`);
});
