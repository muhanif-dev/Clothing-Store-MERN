import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  isAdmin: boolean;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { 
    type: String, required: true
},
  email: { 
    type: String, required: true, unique: true
 },
  passwordHash: { 
    type: String, required: true
 },
  isAdmin: {
     type: Boolean, default: false
     },
  createdAt: {
     type: Date, default: Date.now 
    },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;