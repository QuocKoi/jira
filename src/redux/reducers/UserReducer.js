import { TOKEN, USER_LOGIN } from "../../util/constants/settingSystem";
import { SET_INFORMATION, SET_USER_EDIT, SET_USER_LIST } from '../types/UserType'
import history from '../../util/libs/history'
let userLogin = {};
if (localStorage.getItem(USER_LOGIN)) {
    userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}
if (!localStorage.getItem(TOKEN)) {
    history.push('/login')
}

const initialState = {
    userLogin,
    userList: [],
    userEdit: {
       
    }
}


const UserReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case SET_INFORMATION:
            return { ...state, userLogin: action.content }

        case SET_USER_LIST:
            return { ...state, userList: action.list }
        case SET_USER_EDIT:
            return { ...state, userEdit: action.user }
        default: return { ...state }
    }

}

export default UserReducer