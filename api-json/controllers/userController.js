const fs = require('fs/promises');
const path = require('path');
//const fs2 = require('fs')

const getAllUsuarios= async (req, res)=>{
    const users = await fs.readFile(path.join(__dirname,'../db/user.json'));
    const userJson = JSON.parse(users)
    res.json(userJson);
}

const getOneUser = async (req, res)=>{
    const idUser = req.params.id;
    const allUser = await fs.readFile(path.join(__dirname,'../db/user.json'));
    const objUsers = JSON.parse(allUser);
    const result = objUsers.find((user) => {
        user.id == idUser;
    });
    res.json(result)
}

const updateUser = async (req, res)=>{
    const idUser = req.params.id;
    const {username, password} = req.body;
    const allUser = await fs.readFile(path.join(__dirname,'../db/user.json'));
    const objUsers = JSON.parse(allUser);
   
    const indice = objUsers.findIndex(user => user.id == idUser);

    if (indice !=-1) {
        objUsers[indice] = {
            ...objUsers[indice],
            [username] : username,
            [password] : password
        }
    } else {
        console.log('El ID no fue encontrado en la base de datos.');
    }   
    
    //console.log(objUsers);
    await fs.writeFile(path.join(__dirname,'../db/user.json'), JSON.stringify(objUsers[indice], null, 2), {encoding: 'utf-8'})

    res.json({
        message: "Updated"
    })
}

const login = async (req,res)=>{
    let {body} = req;
    let {username, password} = body;
    let login = await fs.readFile(path.join(__dirname,'../db/user.json'));
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
const agregarUsuario = async (req, res) => {
    try {
        // Obtener los datos del nuevo usuario del cuerpo de la solicitud
        const { username, password, role } = req.body;

        // Leer el archivo de usuarios (si existe)
        let usuarios = [];
        try {
            const data = await fs.readFile(path.join(__dirname, '../db/user.json'));
            usuarios = JSON.parse(data);
        } catch (error) {
            console.error('Error al leer el archivo de usuarios:', error);
        }

        // Agregar el nuevo usuario al arreglo de usuarios
        usuarios.push({ username, password, role });

        // Escribir el nuevo arreglo de usuarios en el archivo
        await fs.promises.writeFile(path.join(__dirname, '../db/user.json'), JSON.stringify(usuarios, null, 2));

        // Responder con un mensaje de éxito
        res.status(201).json({ mensaje: 'Usuario agregado exitosamente' });
    } catch (error) {
        console.error('Error al agregar usuario:', error);
        // Responder con un mensaje de error
        res.status(500).json({ mensaje: 'Error al agregar usuario' });
    }
};
module.exports = {
    getAllUsuarios,
    getOneUser,
    updateUser,
    login,
    agregarUsuario
};