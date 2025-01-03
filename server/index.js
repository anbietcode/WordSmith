const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/User')
const NewModel = require('./models/News')
const VocaModel = require("./models/Vocas")


const app = express()
app.use(express.json())
app.use(cors())



mongoose.connect("mongodb://127.0.0.1:27017/user");

app.listen(3001, ()=> {
    console.log("server is running")
})

app.post("/login",(req,res)=> {
    const {email, password} = req.body
    UserModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password) {
                res.json("Success")
            } else {
                res.json("The password is incorrect")
            }
        } else {
            res.json("No record existed")
        }
    })
})

app.post('/signup',(req,res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/getNews', (req,res) => {
    NewModel.find()
    .then(news => res.json(news))
    .catch(err => res.json(err))
})

app.get('/getNewsDetail/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Tìm bài viết theo id và sử dụng .toObject() để loại bỏ các tham chiếu vòng lặp
        const newDetail = await NewModel.findById(id).lean();
        
        if (!newDetail) {
            return res.status(404).json({ message: 'News not found' });
        }
        // Trả kết quả dưới dạng JSON
        res.status(200).json(newDetail);
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});



app.get('/getVocas', (req,res) => {
    VocaModel.find()
    .then(news => res.json(news))
    .catch(err => res.json(err))
})
app.get('/getVocasDetail/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Tìm bài viết theo id và sử dụng .toObject() để loại bỏ các tham chiếu vòng lặp
        const vocasDetail = await VocaModel.findById(id).lean();
        
        if (!vocasDetail) {
            return res.status(404).json({ message: 'News not found' });
        }
        // Trả kết quả dưới dạng JSON
        res.status(200).json(vocasDetail);
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post("/createNews", (req, res) => {
    NewModel.create(req.body)
    .then(news => res.json(news))
    .catch(err => res.json(err))
})
app.get("/setting",(req,res) =>{
    NewModel.find({})
    .then(news => res.json(news))
    .catch(err => res.json(err))
})
app.get("/getNews/:id",(req,res) => {
    const id = req.params.id;
    NewModel.findById({_id:id})
    .then(news => res.json(news))
    .catch(err => res.json(err))
})
app.put("/updateNews/:id", (req, res) => {
    const id = req.params.id;
    NewModel.findByIdAndUpdate({_id:id}, {
        image:req.body.image,
        name:req.body.name,
        ep:req.body.ep,
        date:req.body.date,
        desmi:req.body.desmi,
    })
    .then(news => res.json(news))
    .catch(err => res.json(err))
})
app.delete("/deleteNews/:id",(req,res) => {
    const id = req.params.id;
    NewModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})



