import connectToMongose from "./database/db.js";
import express from 'express';
import auth from './routes/auth.js';
import notes from './routes/notes.js'
import cors from 'cors';

connectToMongose();

const app = express();
const port = 4000;

// Handle CORS error while deploying
app.use(cors({
    origin: '*'
}));

app.use(cors({
    origin: 'https://inotebook-frontened.vercel.app'
}));

// Middleware
app.use(express.json());

// Available routes
app.use('/api/auth', auth);
app.use('/api/notes', notes);
app.use('/', (req, res) => {
    res.json("eNotebook backend Api");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
