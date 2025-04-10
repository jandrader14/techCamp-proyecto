import { User } from '../models/user.model';

export const userService = {
     getAll:async()=>{
        return await User.find();
    },

    create: async(entity: object)=> {
        return await User.create(entity);
    },

    update: async(id: string, body: object)=>{
        return await User.findByIdAndUpdate(id, body);
    }, 

    delete: async(id: string)=>{
        return await User.findByIdAndDelete(id);
    }


}