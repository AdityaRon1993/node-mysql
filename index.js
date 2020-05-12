const express = require('express')

const mysql = require('mysql');
const multer = require('multer');
const connection = mysql.createConnection({
    host     : '127.0.0.1',
    port : 3306,
    user     : 'root',
    password : 'Qwerty@123',
    database : 'images'
});

const app = express();


app.use(express.json())

app.listen(3000,()=>{
    console.log('server up an running in localhost:3000')
})

connection.connect((err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("mysql connected succesfully")
    }
})
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Autherization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });

app.get('/',(req,res,next)=>{
    res.send('connected')
})
app.get('/images/:id',(req,res,next)=>{
    const param = req.params.id
    connection.query("SELECT LARGEPHOTO from Inventory WHERE ID = "+param,(err , rows, fields)=>{
        if(!err){
            res.send(rows[0].LARGEPHOTO)
        }
        else{
            console.log(err)
        }
    })
})

const upload = multer({
  })
// connection.query('DESCRIBE Inventory;',(err,rows,fields)=>{
//     console.log(err)
//     console.log(rows)
//     console.log(fields)
// })

app.post('/api/uploadimage',upload.single('image'),(req,res,next)=>{
    const ID = Math.random()*1000 + 8659;
    // console.log(req.file.buffer);
    let data = req.file.buffer
    // let data = 123
    console.log(req.body.asd)
    console.log(req.body.qwe)
    let query = "INSERT INTO `Inventory` SET ? "
    let values = {
        ID : 2,
        Name : req.file.originalname,
        LARGEPHOTO : data
    }
    // console.log(Object.keys(req.file))
    try{
        connection.query(query,values,(err, row, fields)=>{
            if(err){
                console.log('err')
                res.send(err)
            }
            res.send({
                ID,
                status : "uploaded"
            })
    
        })
    }
    catch(e){
        console.log(e)
        console.trace(e)
        res.send(e)
    }

})