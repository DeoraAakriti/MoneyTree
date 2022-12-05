import UserService from "../services/UserService.js";

const UserController = {
  getUserById: async (req, res, next) => {
    try {
      var response = await UserService.getUserById(req.params.userId);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({ status: 400, mesage: e.message });
    }
  },
  createNewUser: async (req, res, next) => {
    try {
      var response = await UserService.createNewUser(req.body);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({ status: 400, mesage: e.message });
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      var response = await UserService.deleteUser(req.params.userId);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({ status: 400, mesage: e.message });
    }
  },
  updateUser: async (req, res, next) => {
    try {
      var response = await UserService.updateUser(req.params.userId, req.body);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },

  getUserByuserName: async (req, res, next) => {
    try {
      var response = await UserService.getUserByuserName(
        req.body.userName,
        req.body.password
      );
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({ status: 400, mesage: e.message });
    }
  },
};

export default UserController;
