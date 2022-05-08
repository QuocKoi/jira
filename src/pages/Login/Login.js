import React, { useState } from 'react'
import { Prompt } from 'react-router-dom';
import { useHistory,useLocation,Redirect } from 'react-router-dom';
export default function Login(props) {
    let [userLogin, setUserLogin] = useState({ userName: '', password: '' });
    let [check,setCheck]=useState(false);
    let history = useHistory();
    let location=useLocation();
    let handleGetValue = (e) => {
        let { value, name } = e.target;
        setUserLogin({ ...userLogin, [name]: value });
        if(value.trim()!==''){
            setCheck(true);
        }else{
            setCheck(false);
        }
    }
    let handleSubmit = (e) => {
        e.preventDefault();
        let { userName, password } = userLogin;
        if (userName === 'QuocFE' & password === 'quockoi15') {
            //Thành công trở về trang trước
            history.goBack()
            //Chuyển đến trang  chỉ định sau khi xử lý
            //Push Chuyển hướng đến patch tương ứng
            // history.push(`/detailLogin/${userLogin.userName}`);
            //Replace Thay đổi nội dung tương ứng
            // props.history.replace('/home');
            localStorage.setItem('userLogin', JSON.stringify(userLogin))
        } else {
            alert('Tài khoản Hoặc Mật Khẩu Sai!')
            return;
        }
    }
    

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">UserName</label>
                <input type="text" value={userLogin.userName} name='userName' className="form-control" id="exampleInputEmail1" onChange={handleGetValue} />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" value={userLogin.password} name='password' className="form-control" id="exampleInputPassword1" onChange={handleGetValue} />
            </div>
            <button type="submit" className="btn btn-primary" >Submit</button>
            
        </form>

    )
}


