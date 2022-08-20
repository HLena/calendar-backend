import { response } from 'express';
import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import { generateJWT } from '../helpers/jwt.js';


const createUser = async (req, res = response) => {

    const { email, name, password } = req.body;
    try {
        let user = await User.findOne({email});
        if(user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            })
        }

        user = await new User(req.body);

        //Encriptar contraseña 
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        user.save();

        //Generar token JWT
        const token = await generateJWT(user.id, user.name)
    
        res.status(201).json({
            ok: true,
            uid: user.id,
            name,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }
}

const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese email'
            })
        }
        // comparar contraseñas
        const validPassword = await bcrypt.compareSync(password, user.password);

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es correcta'
            })
        }

        //Generar token JWT
        const token = await generateJWT(user.id, user.name)


        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name, 
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })

    }

}

const renewToken = async (req, res) => {

    const { uid, name} = req;

    const token = await generateJWT(uid, name)

    res.json({
        ok: true,
        token
    })
}

export {
    createUser, login, renewToken
}