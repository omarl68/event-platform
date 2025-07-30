import { Schema, model, Document, Model, Types } from 'mongoose';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

export const documentName = 'Event';
export const collectionName = 'events';


export interface IEvent extends Document {
    createdBy: Types.ObjectId | string;
    title: string;
    date: Date;
    location: string;
    numberOfParticipants: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const eventSchema = new Schema<IEvent>({
    createdBy: { type: Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    numberOfParticipants: { type: Number, required: true, default: 0 },
}, {
    timestamps: true,
    versionKey: false,
});

eventSchema.plugin(mongoosePagination);

export const Event = model<IEvent, Model<IEvent> & Pagination<IEvent>>(
    documentName,
    eventSchema,
    collectionName
);