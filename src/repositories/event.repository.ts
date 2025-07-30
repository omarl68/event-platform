import { Types } from 'mongoose';
import { PaginationModel } from 'mongoose-paginate-ts';
import { Event, IEvent } from '../models/event.model';
import APIFeatures from '../utils/apiFeatures';

type PagingObj = {
    limit?: number;
    page?: number;
};

const getAll = async (condition: object, paging: PagingObj, query: object) => {
    let findAllQuery = Event.find({ ...condition });

    const features = new APIFeatures(findAllQuery, query)
        .filter()
        .sort()
        .limitFields()
        .search(['name', 'location', 'description']);

    const options = {
        query: features.query,
        limit: paging.limit ? paging.limit : null,
        page: paging.page ? paging.page : null,
        populate: 'createdBy',
    };

    return (await Event.paginate(options)) as PaginationModel<IEvent>;
};

const getById = async (id: Types.ObjectId, select: string = '', populate: string = '') =>
    await Event.findById(id).select(select).populate(populate);

const getByQuery = async (options: object, select: string = '', populate: string = '') =>
    await Event.findOne(options).select(select).populate(populate);

const getOneByQuery = async (options: object, select: string = '', populate: string = '') =>
    await Event.findOne(options).select(select).populate(populate);

const create = async (item: object) => await Event.create(item);

const edit = async (id: Types.ObjectId, item: object) =>
    await Event.findByIdAndUpdate(id, item, { new: true });

const remove = async (id: Types.ObjectId) => await Event.findByIdAndDelete(id);

export default {
    getAll,
    getById,
    getByQuery,
    getOneByQuery,
    create,
    edit,
    remove,
};