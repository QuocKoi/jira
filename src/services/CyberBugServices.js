import axios from "axios"
import { DOMAIN_CYBERBUGS, TOKEN } from '../util/constants/settingSystem'
import { BaseServices } from "./BaseServices"
class CyberBugServices extends BaseServices {
    constructor() {
        super();
    }
    loginCyberBugs = (account) => {
        return this.post("users/signin", account)
    }
    fetchProjectCategory = () => {
        return this.get("ProjectCategory");
    }
    createProject = (project) => {
        return this.post("Project/createProject", project);
    }
    createProjectAuthorize = (project) => {
        return this.post("Project/createProjectAuthorize", project)
    }
    fetchAllProject = () => {
        return this.get("Project/getAllProject");
    }
    updateProject = (project) => {
        return this.put("Project/updateProject?projectId", project)
    }
    deleteProject = (id) => {
        return this.delete("Project/deleteProject?projectId", id);
    }
    getUser = (keyword) => {
        return this.get(`Users/getUser?keyword=${keyword}`);
    }
    assignUser=(data)=>{
        return this.post("Project/assignUserProject",data)
    }
    removeUserFromProject=(data)=>{
        return this.post("Project/removeUserFromProject",data);
    }
    fetchProjectDetail=(id)=>{
        return this.get(`Project/getProjectDetail?id=${id}`)
    }
    fetchAllPriority=()=>{
        return  this.get("Priority/getAll")
    }
    fetchAllTaskType=()=>{
        return this.get("TaskType/getAll");
    }
    createTask=(task)=>{
        return this.post("Project/createTask",task)
    }
    updateTask=(newTask)=>{
        return this.post("Project/updateTask",newTask)
    }
    updateStatus=(data)=>{
        return this.put("Project/updateStatus",data)
    }
   
    


}
export const cyberBugServices = new CyberBugServices();
