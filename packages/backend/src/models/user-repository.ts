import { model, Schema } from "mongoose";

export interface IUser{
    username: string;
    password: string;
    name: string
    roles: string[];
}

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    roles: Array<String>
});

const UserModel = model<IUser>("IUser", UserSchema);

export const loadUserByUsername = async (username: string): Promise<IUser | null> => {
    return await UserModel.findOne({username: username}).exec()
}