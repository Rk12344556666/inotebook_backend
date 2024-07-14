import connectToMongose from "./database/db.js";
import express from 'express';
import auth from './routes/auth.js';
import notes from './routes/notes.js'
import cors from'cors';
connectToMongose();
const app=express();
const port =4000;
// route this way is not good way to make routes we make new folder routes

// *middleware
app.use(express.json());
app.use(cors())

// * Available routes
// app.use('/',(req,res)=>{
//     res.json("eNotebook backend Api")
// })
app.use('/api/auth',auth);
app.use('/api/notes',notes);




app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})