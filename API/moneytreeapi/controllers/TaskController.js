import TaskService from "../services/TaskService.js";

const TaskController = {

    getAllByUserId: async(req, res, next) => {
        try{
            var tasks = await TaskService.getAllByUserId(req.params.userId);
            return res.status(200).json(tasks);
        } catch(e) {
            return res.status(400).json({status: 400, mesage: e.message});
        }
    },
    getById: async(req, res, next) => {
        try{
            var task = await TaskService.getById(req.params.userId, req.params.taskId);
            return res.status(200).json(task);
        } catch(e) {
            return res.status(400).json({status: 400, mesage: e.message});
        }
    },
    createNewTask: async(req, res, next) => {
        try{
            var response = await TaskService.createNewTask(req.params.userId, req.body);
            return res.status(200).json(response);
        } catch(e) {
            return res.status(400).json({status: 400, message: e.message});
        }
    },
    updateTask: async(req, res, next) => {
        try{
            var response = await TaskService.updateTask(req.params.taskId, req.body);
            return res.status(200).json(response);
        } catch(e){
            return res.status(400).json({status: 400, message: e.message});
        }
    },
    deleteTask: async(req, res, next) => {
        try{
            var response = await TaskService.deleteTask(req.params.taskId);
            return res.status(200).json(response);
        } catch (e){
            return res.status(400).json({status: 400, message: e.message});
        }
    }
}

export default TaskController;