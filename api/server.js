// SUNUCUYU BU DOSYAYA KURUN
const express = require("express");
const User = require("./users/model.js");

const server = express();
server.use(express.json)//json tabanlı istekleri karşılamak için

server.post("/api/users", (req,res) => {
    let user = req.body.User;
    if(!user.name || !user.bio){
        response.status(400).json({message:"Lütfen kullanıcı için name veya bio tanımlayın"});
    }else{
        User.insert(user).then((newUser)=>{
        res.status(201).json(newUser);
        })
    }
})
module.exports = server; // SERVERINIZI EXPORT EDİN {}
