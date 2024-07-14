import express from 'express';
import User from '../models/User.js';
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import 'dotenv/config';
import fetchuser from '../middleware/fetchuser.js';
const router = express.Router();
// *Route 1 :create a user using: post "/api/auth/signup"   .No login required

router.post('/signup', async (req, res) => {
    //  data coming from the body(frontended)
    const { name, email, password } = req.body;

    try {
        // validation
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All filed are required" })

        }
        //   email validation
        if (!email.includes("@")) {
            return res.status(400).json({ error: "Please enter a valid email id" })
        }
        // find unique user with email

        const user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ error: "User already exist" });
        }


        // hum ab password ko salt and hash karenge 

        // generate salt
        const salt = await bcrypt.genSalt(10);

        // hash password
        const hashpassword = await bcrypt.hash(password, salt);




        // save data into database
        const newuser = await User({
            name,
            email,
            password: hashpassword
        });
        await newuser.save();
        console.log(newuser);
        res.status(201).json({ success: "Signup Successfully" });


    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
})




// route2  login a user using post "/api/auth/login" no login required



router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // validation
        if (!email || !password) {
            return res.status(400).json({ error: "All filed are required" })

        }


        //   email validation
        if (!email.includes("@")) {
            return res.status(400).json({ error: "Please enter a valid email id" })
        }
        // find unique user with email

        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            res.status(400).json({ error: "User Not Found" });
        }



        // matching user password to hash password with brcypt.compare()
        const doMatch = await bcrypt.compare(password, user.password);
        console.log(doMatch);


        if (doMatch) {
            const token = jwt.sign({ userId: user.id },""+process.env.JWT_SECRET, {
                expiresIn: '7d'
            })
            res.status(200).json({ token });
        } else {
            res.status(404).json({ error: "Email and password are not found" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("internal server error");
    }


})





//3 route get loggin user details using: POST "/api/auth/getuser". login required

router.get('/getuser',fetchuser, async(req,res)=>{
    try {
       
      const  userId=req.userId;
      console.log(userId)//print user id
        const user= await User.findById(userId).select("-password");
        res.send(user);



    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
        
    }
})

export default router;