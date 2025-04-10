import { User } from '../models/user.model';

export const userService = {
    async getAll(){
        return await User.find();

    }

}