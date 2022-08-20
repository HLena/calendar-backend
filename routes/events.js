import { Router } from 'express';
import { check } from 'express-validator'


import { 
    getEvents,
    createEvent,
    deleteEvent,
    updateEvent
} from '../controllers/events.js';
import { isDate } from '../helpers/isDate.js';
import { validateFields } from '../middlewares/validateFields.js';
import { validateJWT } from '../middlewares/validateJWT.js';




const router = Router();

router.use(validateJWT)

router.get('/',getEvents);

router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatorio').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatorio').custom(isDate),
        validateFields
    ],
    createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent)





export  { router as routerEvents };