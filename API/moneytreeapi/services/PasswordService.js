import Password from "../models/data/Password.js";

const PasswordService = {

    deleteByUserId: async (userId) => {
        try{
            const response = await Password.query().delete().where('Passwords.UserId', userId);
            return response;
        } catch(e){
            throw Error('Error while deleting password for user');
        }
    },

    getByUserId: async (userId) => {
        try{
            const response = await Password.query().where('Passwords.UserId', userId);
            return response;
        } catch(e){
            throw Error(e);
        }
    }
}

export default PasswordService;