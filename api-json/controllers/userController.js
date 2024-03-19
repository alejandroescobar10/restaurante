const fs = require('fs/promises');
const path = require('path');

const getAllUsuarios= async (req, res)=>{
    const users = await fs.readFile(path.join(__dirname,'../../db/user.json'));
    const userJson = JSON.parse(users)
    res.json(userJson);
}

const getOneUser = async (req, res)=>{
    const idUser = req.params.id;
    const allUser = await fs.readFile(path.join(__dirname,'../../db/user.json'));
    const objUsers = JSON.parse(allUser);
    const result = objUsers.find((user) => {
        user.id == idUser;
    });
    res.json(result)
}

const updateUser = async (req, res)=>{
    const idUser = req.params.id;
    const {username, password} = req.body;
    const allUser = await fs.readFile(path.join(__dirname,'../../db/user.json'));
    const objUsers = JSON.parse(allUser);
   
    const indice = objUsers.findIndex(user => user.id == id);

    if (indice !=-1) {
        objUsers[indice] = {
            ...objUsers[indice],
            [username] : username,
            [password] : password
        }
    } else {
        console.log('El ID no fue encontrado en el arreglo.');
    }   
    
    //console.log(objUsers);
    await fs.writeFile(path.join(__dirname,'../../db/user.json'), JSON.stringify(objUpdate, null, 2), {encoding: 'utf-8'})

    res.json({
        message: "Updated"
    })
}

const login = async (req,res)=>{
    let {body} = req;
    let {username, password} = body;
    let login = await fs.readFile(path.join(__dirname,'../../db/user.json'));
    let loginJson = JSON.parse(login)
    //donde voy a guardar el usuario si es valido
    let user_select = []
    //recoorer todos los usuarios almacenados en el json
    loginJson.forEach(user => {
        //comparar el usuario que me llega en el post con el que tengo almacenado en el json
        if(user.username == username && user.password == password){
            //si lass credenciales son validas asigno el user al user_select
            user_select = user
        }
    });
    //devuelvo los datos del usuario si son correctos
    res.json({
        usuario: user_select
    })
}