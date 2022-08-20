import { response } from 'express';
import Event from '../models/EventModel.js';


const createEvent = async (req, res = response) => {
    
    let newEvent = new Event(req.body); 

    try {
        newEvent.user = req.uid;
        newEvent = await newEvent.save();
        res.status(201).json({
            ok: true,
            event: newEvent
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }
}

const getEvents = async (req, res = response) => {

    const events = await Event.find({})
                                .populate('user', 'name');
    res.status(201).json({
        ok: true,
        events
    })
}

const updateEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);
        console.log(event)

        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe'
            })
        }

        if(event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permiso de editar este evento'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

        res.status(201).json({
            ok: true,
            msg: updatedEvent
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }
}

const deleteEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(eventId);

        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe'
            })
        }

        if(event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permiso de eliminar este evento'
            })
        }

        await Event.findByIdAndDelete(eventId);
        
        res.status(201).json({
            ok: true,
            msg: 'deleted Event'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }
}





export {
    createEvent,
    deleteEvent,
    updateEvent,
    getEvents
}