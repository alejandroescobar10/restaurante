const routerApi = require('./routes')
const express = require('express');//Se agrega al index de las rutas
const {urlencoded, json} = require('express');
const cors = require('cors');


const app = express();

app.use(urlencoded({extended: true}))
app.use(json())

app.use(cors());

const rutas = express.Router();//Se agrega al index de las rutas
routerApi(rutas); 
app.use('/v1', rutas);//Se agrega al index de las rutas




app.listen(4000, ()=>{
    console.log('listening at port 4000');
})
