// SUNUCUYU BU DOSYAYA KURUN
const express = require("express");
const User = require("./users/model.js");

const server = express();
server.use(express.json())//json tabanlı istekleri karşılamak için

//GET APİ
server.get("/", (req, res) => {
    User.find().then((users) =>{
        res.status(200).json(users)
        }).catch((err) => {
            res.status(500).json(err);
        });
    });

    server.get("/api/users/:id", (req, res) => {
        User.findById(req.params.id).then((user) => {
            if(!user){
                res.status(404).json({message:"Hata mesajı"});
            }else{
                res.status(200).json(user);
            }
        }).catch((err) => {
            res.status(500).json({message:"Kullanıcı bilgisi alınamadı"});
        })
    })

//POST APİ
server.post("/api/users", (req,res) => {
    let user = req.body;
    if(!user.name || !user.bio){
        res .status(400).json({message:"Lütfen kullanıcı için name veya bio tanımlayın"});
    }else{
        User.insert(user)
        .then((newUser)=>{
        res.status(201).json(newUser);
        })
        .catch((err) => {
            res.status(500).json({message: "Bir hata oluştu"});
        });
    }
});

//DELETE
server.delete("/api/users/:id", async (req, res) => {
    try{
    let willBeDeleteUser = await User.findById(req.params.id);
    if(!willBeDeleteUser){
        res.status(404).json({message:"hata mesajı"});
    }else{
       await User.remove(req.params.id);
       res.satatus(200).json(willBeDeleteUser);
    }
    }catch (err) {
        res.status(500).json({message: "Kullanıcı silinemedi"});
    }
})

//PUT APİ

server.put("/api/users/:id", async (req, res) => {
    try {
        let willBeUpdatedUser = await User.findById(req.params.id);
        if(!willBeUpdatedUser){
            res.status(404).json({message:"Kullanıcı bulunamadı"});
        }else{
            if(!req.body.name || !req.body.bio){
                res.status(400).json({ message: "Lütfen kullanıcı için name ve bio tanımlayın"})
            }else {
                let updatedUser = await User.update(req.params.id, req.body);
                res.status(200).json(updatedUser);
            }
        }

    } catch (error) {
        res.status(500).json({message: "Kullanıcıbilgileri güncellenemedi"});
    }
});


module.exports = server; // SERVERINIZI EXPORT EDİN {}
