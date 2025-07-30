import { Router } from "express";
import { ValidationSource } from "../../constants/constants";
import validator from "../../core/middleware/validator";
import Authorization from '../../core/middleware/auth';
import EventController from "../../controllers/event.controller";
import EventValidator from "./event.validator";

const router = Router();

router.route('/events')
    .get(Authorization.Authenticated, EventController.getAllEvents)
    .post(
        Authorization.Authenticated,
        validator(EventValidator.createEvent),
        EventController.createEvent
    );

router.get('/events/stats',
    Authorization.Authenticated,
    EventController.getEventStats
);

router.route('/events/:id')
    .get(
        Authorization.Authenticated,
        validator(EventValidator.eventId, ValidationSource.PARAM),
        EventController.getEventById
    )
    .put(
        Authorization.Authenticated,
        validator(EventValidator.eventId, ValidationSource.PARAM),
        validator(EventValidator.updateEvent),
        EventController.updateEvent
    )
    .delete(
        Authorization.Authenticated,
        validator(EventValidator.eventId, ValidationSource.PARAM),
        EventController.deleteEvent
    );

export default router;