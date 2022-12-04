import Password from '../models/data/Password.js';
import User from '../models/data/User.js'
import PasswordService from './PasswordService.js';

const UserService = {

    getUserById: async (userId) => {
        try {
            const response = await User.query().withGraphJoined('[accounts, categories, transactions, tasks]').where('Users.Id', userId)
            .where('Accounts.IsDeleted', false).where('Categories.IsDeleted', false).where('Transactions.IsDeleted', false).where('Tasks.IsDeleted', false);
            return response;
        } catch (e) {
            throw Error('Error while getting user');
        }
    },
    createNewUser: async (data) => {
        try{
            const timestamp = new Date().toISOString();
            const response = await User.query().insertGraph({
                FirstName: data.firstName,
                LastName: data.lastName,
                UserName: data.userName,
                CreatedAt: timestamp,
                UpdatedAt: timestamp,
                passwords: [{
                    password: data.password,
                    CreatedAt: timestamp,
                    UpdatedAt: timestamp
                }]
            })
            return response;
        } catch (e) {
            throw Error('Error while creating new user');
        }

    },
    deleteUser: async (userId) => {
        try{
            var response = await PasswordService.deleteByUserId(userId);
            response = await User.query().deleteById(userId);
            return response;
        } catch (e) {
            throw Error('Error while deleting user');
        }
    },
    updateUser: async (userId, data) => {
        try{
            const response = await User.query().findById(userId).patch({
                FirstName: data.firstName,
                LastName: data.lastName,
                UpdatedAt: new Date().toISOString()
            });
            return response
        } catch (e){
             throw Error('Error while updating user');
        }
    },
    getUserByuserName: async (userName, password) => {
        try {
            // const saltPassword = await bcrypt.genSalt(10)
            // const securePassword = await bcrypt.hash(password, saltPassword)
            const response = await User.query().where('Users.UserName', userName);
            console.log(response)
            const passwordResponse = await PasswordService.getByUserId(response[0].Id)
            console.log(passwordResponse)
            if(passwordResponse[0].Password == password)
                return response;
            throw Error('Invalid User')
        } catch (e) {
            throw Error(e);
        }
    }

}

export default UserService;