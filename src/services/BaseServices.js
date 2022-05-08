import axios from "axios";
import { DOMAIN_CYBERBUGS, TOKEN } from "../util/constants/settingSystem";

export class BaseServices {
    constructor() { }

    get(url) {
        return axios({
            url: `${DOMAIN_CYBERBUGS}/${url}`,
            method: 'GET',
            headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
        })
    }
    post(url, object) {
        return axios({
            url: `${DOMAIN_CYBERBUGS}/${url}`,
            method: 'POST',
            data: object,
            headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
        })
    }
    put(url, object) {
        return axios({
            url: `${DOMAIN_CYBERBUGS}/${url}=${object.id}`,
            method: 'PUT',
            headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
            data: object
        })
    }
    delete(url,id){
        return axios({
            url:`${DOMAIN_CYBERBUGS}/${url}=${id}`,
            method:'DELETE',
            headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
        })
    }
    putComment(url) {
        return axios({
            url: `${DOMAIN_CYBERBUGS}/${url}`,
            method: 'PUT',
            headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
        })
    }
    putEditUser(url,object){
        return axios({
            url: `${DOMAIN_CYBERBUGS}/${url}`,
            method: 'PUT',
            headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
            data: object
        })  
    }
}