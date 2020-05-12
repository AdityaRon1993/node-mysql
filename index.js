const express = require('express')

const mysql = require('mysql');
const multer = require('multer');
const connection = mysql.createConnection({
    host     : 'sql252.main-hosting.eu',
    user     : 'u103715929_techhack',
    password : 'techhack@123',
    database : 'u103715929_techhack'
});

const app = express();


app.use(express.json())

app.listen(3000,()=>{
    console.log('server up an running in localhost:3000')
})

connection.connect((err)=>{
    if(err){
        console.log("mysql connected unsuccesfully")
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
  connection.query('show databases',(err,rows,fields)=>{
      console.log(err)
      console.log(rows)
      console.log(fields)
  })

// app.get('/',(req,res,next)=>{
//     res.send('connected')
// })
// app.get('/images/:id',(req,res,next)=>{
//     const param = req.params.id
//     connection.query("SELECT LARGEPHOTO from Inventory WHERE ID = "+param,(err , rows, fields)=>{
//         if(!err){
//             res.send(rows[0].LARGEPHOTO)
//         }
//         else{
//             console.log(err)
//         }
//     })
// })

// const upload = multer({
//   })
// app.post('/api/uploadimage',upload.single('image'),(req,res,next)=>{
//     const ID = Math.random()*1000 + 8659;
//     let data = req.file.buffer
//     console.log(req.body.asd)
//     console.log(req.body.qwe)
//     let query = "INSERT INTO `Inventory` SET ? "
//     let values = {
//         ID : 2,
//         Name : req.file.originalname,
//         LARGEPHOTO : data
//     }
//     try{
//         connection.query(query,values,(err, row, fields)=>{
//             if(err){
//                 console.log('err')
//                 res.send(err)
//             }
//             res.send({
//                 ID,
//                 status : "uploaded"
//             })
    
//         })
//     }
//     catch(e){
//         console.log(e)
//         console.trace(e)
//         res.send(e)
//     }

// })