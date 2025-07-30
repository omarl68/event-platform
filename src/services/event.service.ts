import { Types } from 'mongoose';
import { ErrorHandler } from '../utils/errorHandler';
import eventRepository from '../repositories/event.repository';
import { HttpCode } from '../utils/httpCode';
import { create } from 'domain';

class EventService {
    static async getAllEvents(page: number, pageSize: number, query: object) {
        const options = {
            page: page,
            limit: pageSize,
        };
        return await eventRepository.getAll({}, options, query);
    }

    static async getEventById(id: Types.ObjectId) {
        const event = await eventRepository.getById(id, '', 'createdBy');
        if (!event) {
            throw new ErrorHandler('Event not found', HttpCode.NOT_FOUND);
        }
        return event;
    }

    static async createEvent(eventData: any) {
        const event = await eventRepository.create(eventData);
        return {
            id: event._id,
            title: event.title,
            date: event.date,
            numberOfParticipants: event.numberOfParticipants, // Include if relevant
            createdBy: event.createdBy,
            location: event.location,
            createdAt: event.createdAt,
            updatedAt: event.updatedAt
        };
    }

    static async updateEvent(id: Types.ObjectId, data: any) {
        const event = await eventRepository.getById(id);
        if (!event) {
            throw new ErrorHandler('Event not found', HttpCode.NOT_FOUND);
        }
        return await eventRepository.edit(id, data);
    }

    static async deleteEvent(id: Types.ObjectId) {
        const event = await eventRepository.getById(id);
        if (!event) {
            throw new ErrorHandler('Event not found', HttpCode.NOT_FOUND);
        }
        return await eventRepository.remove(id);
    }
}

export default EventService;