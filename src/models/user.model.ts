import mongoose, { Document, model, Model, Schema } from 'mongoose';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import jwtHelper from '../utils/jwtHelper';

export const documentName = 'User';
export const collectionName = 'users';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre('save', async function (this: IUser, next) {
  if (this.isModified('email')) this.email = this.email?.toLowerCase();
  if (!this.isModified('password')) return next();
  this.password = await jwtHelper.PasswordHashing(this.password);
  next();
});


userSchema.plugin(mongoosePagination);

export const User = model<IUser, Model<IUser> & Pagination<IUser>>(
  documentName, userSchema, collectionName
);
