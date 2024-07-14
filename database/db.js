

import{connect} from 'mongoose'
import 'dotenv/config'
const connectToMongose=async ()=>{
    const mongouri=process.env.MONGO_URI;
    try {
        await connect(mongouri);
        console.log("connect to databse sucessfully");
    } catch (error) {
        console.log(error);
        
    }
}
export default connectToMongose;