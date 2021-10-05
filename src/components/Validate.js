import {Link} from 'react-router-dom';
import request from '../service/request'
import { useHistory } from "react-router-dom";
import {useState,useEffect} from 'react'
const Validate = (props) => {
  
  
  const login =async ()=>{
    const user ={
      username: document.getElementById("inputUser").value,
      password: document.getElementById("inputPass").value
      
    }
    sessionStorage.username = user.username
    sessionStorage.password = user.password
    const url='http://localhost:1337/user/login'
    const res = await request.request(url,"POST",user)
    
    const data = await res.json()
    if(data.errorMK=="MK sai"){
      alert("Sai mật khẩu ")
      return false
    }
    if(data.errDV=="TBM"){
      alert("Dang nhap device khac ")
      console.log(data)
      props.history.push("/otp");
      return false
    }
    sessionStorage.token = data
    
    props.history.push("/home");
    
  }
  return (
    <div className="popup">
      <div className="popup-inner">
        <h1>Đăng Nhập </h1>
        <form className="form-control"  >
          <div>
            <label for="user">User</label>
            <input
              id = "inputUser"
              type="text"
              name="user"
              class="form-control"
            ></input>
          </div>
          <div>
            <label for="password">Password</label>
            <input
              id ="inputPass"
              type="password"
              name="password"
              class="form-control"
            ></input>
          </div>
          
        </form>
        <button class="btn-submit" onClick={login}  >
          Submit
        </button>
        <Link to='./signup'><a>Đăng kí tài khoản </a></Link>
      </div>
    </div>
  );
};

export default Validate;
