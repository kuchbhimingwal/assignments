const { Router } = require("express");
const router = Router();
const { User, Course } = require('../db')
const userMiddleware = require("../middleware/user");
const jwt = require('jsonwebtoken');
const jwtKey = require("../config")

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    User.create({
        username : username,
        password : password
    })
    .then(()=>{
        res.json({message: "user created sussefully"})
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.find({
        username,
        password
    })
    if(user){
        const token = jwt.sign({username: username}, jwtKey);
        res.json({token: token})
    } else {
        res.status(411).json({message :"user not found"});
    }
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find({})
    .then((response)=>{
        res.json({
            Courses : response
        })
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    console.log(courseId)
    const username = req.headers.username;
    await User.updateOne({
        username: username
    },{
        "$push" : {
            puchasedCourses: courseId
        }
    }
    );
    res.json({
        message: "Purchase Complete!"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
     const user = await User.findOne({
        username: req.headers.username
     });
     const course = await Course.find({
        _id: {
            "$in": user.puchasedCourses
        }
     })
    console.log(user.puchasedCourses)
    res.json({
        msg: course
    })
});

module.exports = router