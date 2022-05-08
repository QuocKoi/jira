import { BaseServices } from "./BaseServices";

class UserServices extends BaseServices{
    constructor(){
        super()
    }
    sigupAccount=(information)=>{
        return this.post('Users/signup',information);
    }
    deleteAccount=(userId)=>{
        return this.delete('Users/deleteUser?id',userId)
    }
    editUser=(data)=>{
        return this.putEditUser('Users/editUser',data)
    }
}


export const userServices=new UserServices();