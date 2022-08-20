import { Router } from 'express';
import { check } from 'express-validator'
import { validateFields } from '../middlewares/validateFields.js'
import { validateJWT } from '../middlewares/validateJWT.js';
import { createUser, login, renewToken } from '../controllers/auth.js';



const router = Router();

router.post(
    '/register',
    [
        check('name','The name is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        check('password', 'The password must be 6 digits').isLength({ min:6}),
        validateFields
    ],
    createUser);

router.post('/',
    [
        check('email', 'The email is required').isEmail(),
        check('password', 'The password must be 6 digits').isLength({ min:6}),
        validateFields
    ]
    ,login);

router.get('/renew', validateJWT ,renewToken);


export  { router as routerAuth };