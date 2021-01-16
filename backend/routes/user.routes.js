let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    uuid4 = require('uuid/v4'),
    router = express.Router();


const DIR = './public/';

const storage = multer.diskStorage({
    destination:(req, res, cb)=>{
        cb(null, DIR);
    },
    filename:(req, file, cb) =>{
        const filename = file.originalname.toLocaleLowerCase().split(' ').join('-');
        cb(null, uuid4()+'_'+filename)
    }
})

var upload = multer({
    storage:storage,
    fileFilter:(req, res, cb)=>{
        if(file.mimetype == "image/png" || file.mimetype =="image/jpg" || file.mimetype =="image/jpeg"){
            cb(null, true);
        }else{
            cb(null, false);
            return cb(new Error('Only .png, .jpeg and .jpg file format allwed!'));
        }
    }
})

// User Model
var User = require('../database/models');
 
router.post('/user-profile', upload.single('profileImg'), (req, res, next)=>{
    const url = req.protocol+ '://'+ req.get('host');
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        profileImg: url+ '/public'+ req.file.filename
    });
    user.save().then(result=>{
        res.status(201).json({
            message: "User registered successfully",
            userCreated: {
                _id :result._id,
                profileImg: result.profileImg
            }
        })
    }).catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    })
})

router.get("/", (req, res, next)=>{
    user.find().then(data=>{
        res.status(200).json({
            message: "User list retrrived sucessfully",
            users: data
        })
    })
})

module.exports = router;