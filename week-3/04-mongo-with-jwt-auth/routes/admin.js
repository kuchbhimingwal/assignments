const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db")
const router = Router();
const jwt = require('jsonwebtoken');
const jwtKey = require("../index")

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    Admin.create({
        username: username,
        password: password
    })
    
    res.json({message: 'Admin created successfully'})
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const token = jwt.sign({username: username}, jwtKey);

    res.json({token: token})
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    Course.create({
        title,
        description,
        imageLink,
        price
    })
    .then((newCousr)=>{
        res.json({
            message: "Course created sussefully" , courseId: newCousr._id
        })
    })
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;