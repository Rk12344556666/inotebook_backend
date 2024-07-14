import 'dotenv/config';
import jwt from'jsonwebtoken';
const fetchuser=(req,res,next)=>{

    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please authenticate using a vlaid token"})

    }

try {
    

const {userId}=jwt.verify(token,""+process.env.JWT_SECRET)
req.userId=userId;
console.log("fetched :",userId)

next(); //if verfied then execute the next function


} catch (error) {
    res.status(401).send({error:"please authenticate using a valid token"})

}

}

export default fetchuser;
