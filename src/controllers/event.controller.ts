import { Request, Response, RequestHandler } from 'express';
import { Types } from 'mongoose';
import EventService from '../services/event.service';
import AsyncHandler from 'express-async-handler';
import { DEFAULT_CURRENT_PAGE, DEFAULT_PAGE_SIZE } from '../constants/constants';
import { HttpCode } from '../utils/httpCode';

// @desc    Get all events
// @route   GET /api/events
// @access  Private
const getAllEvents: RequestHandler = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const { page, pageSize } = req.query;
        const result = await EventService.getAllEvents(
            Number(page || DEFAULT_CURRENT_PAGE),
            Number(pageSize || DEFAULT_PAGE_SIZE),
            req?.query
        );
        res.status(HttpCode.OK).json({ success: true, message: '', data: result });
    },
);

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Private
const getEventById: RequestHandler = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const { id } = req?.params;
        const result = await EventService.getEventById(new Types.ObjectId(id));
        res.status(HttpCode.OK).json({ success: true, message: '', data: result });
    },
);

// @desc    Create event
// @route   POST /api/events
// @access  Private
const createEvent: RequestHandler = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const { user, body } = req;
        body.createdBy = user.id;
        const result = await EventService.createEvent(body);
        res
            .status(HttpCode.CREATED)
            .json({ success: true, message: 'Event created successfully', data: result });
    },
);

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private
const updateEvent: RequestHandler = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const { id } = req?.params;
        const result = await EventService.updateEvent(new Types.ObjectId(id), req.body);
        res
            .status(HttpCode.OK)
            .json({ success: true, message: 'Event updated successfully', data: result });
    },
);

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvent: RequestHandler = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const { id } = req?.params;
        const result = await EventService.deleteEvent(new Types.ObjectId(id));
        res
            .status(HttpCode.OK)
            .json({ success: true, message: 'Event deleted successfully', data: result });
    },
);


// @desc    Get event statistics
// @route   GET /api/events/stats
// @access  Private
const getEventStats: RequestHandler = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const result = await EventService.getEventStats();
        res.status(HttpCode.OK).json({
            success: true, message: '', data: result
        });
    },
);

export default {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventStats
};