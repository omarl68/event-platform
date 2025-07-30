import Joi from 'joi';
import JoiObjectId from '../../utils/joiObjectId';

const eventId = Joi.object({
    id: JoiObjectId().required()
});

const createEvent = Joi.object({
    title: Joi.string().required(),
    date: Joi.date().iso().required(),
    location: Joi.string().required(),
    numberOfParticipants: Joi.number().integer().default(0),
});

const updateEvent = Joi.object({
    title: Joi.string().optional(),
    date: Joi.date().iso().optional(),
    location: Joi.string().optional(),
    numberOfParticipants: Joi.number().integer().optional(),
});


export default {
    eventId,
    createEvent,
    updateEvent
};