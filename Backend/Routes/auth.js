const express=require('express');
const User =require('../Models/User')
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bctypt = require('bcryptjs')
const jwt=require('jsonwebtoken')
const JWT_SECRET="SAMARTH"
const fetchuser = require('../middleware/fetchuser')

//route 1 : create account 

router.post('/createUser',
[
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 })
],async (req,res)=>{
   let sucess=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ sucess,errors: errors.array() });
    }
    try{
    console.log(req.body);
    const salt = await  bctypt.genSalt(10);
    secPass =  await bctypt.hash(req.body.password,salt);

    let user =await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      })
      const data=
      {
        user:{
          id : user.id
        }
      }
      sucess=true;
      const authtoken = jwt.sign(data,JWT_SECRET)
      res.json({sucess,authtoken})


      // res.json(user)
    }catch(error ){
      // console.error(error)
      console.log(error);
      res.status(500).send("Some error occured");
    }
    
    
})

//route 2 : login account 

router.post('/login',
[
    body('email').isEmail(),
    // body('name').isLength({ min: 5 }),
    body('password').exists(),
],async (req,res)=>{
  let sucess=false;
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({sucess, errors: errors.array() });
    }
    const{email,password}=req.body;
    try{
        let usere = await User.findOne({email});
        if(!usere)
        {
          return res.status(400).json({sucess,error:"PLease enter correct credentials."})
        }
        let passwordC = await bctypt.compare(password, usere.password);
        if(!passwordC)
        {
          return res.status(400).json({sucess,error:"PLease enter correct credentials."})
        }

        const data=
      {
        user:{
          id : usere.id
        }
      }
        const authtoken = jwt.sign(data,JWT_SECRET)
        sucess=true;
      res.json({sucess,authtoken})



    }catch (err)
    {
      console.error(err.message);
      res.status(500).send("Internal server  error occured");
    }

})


//route 3 : getting loggedin user detail


router.post('/getuser', fetchuser ,async(req,res)=>{

    try {
       const userID=req.user.id;
    
      const user = await User.findById(userID).select("-password")
      res.send(user);
      
    } catch (error) 
    {
      console.error(error.message);
      res.status(500).send("Internal server  error occured");
    }



  })

module.exports=router