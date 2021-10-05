import {Link} from 'react-router-dom';
import request from '../service/request'
import { useHistory } from "react-router-dom";
const SignUp = (props) => {
 
  const login =async ()=>{
    let pass1 = document.getElementById("inputPass").value
    let pass2 = document.getElementById("inputPass2").value
    let name = document.getElementById("inputUser").value
    let email = document.getElementById("inputEmail").value
    if(pass1 =="" || name =="" || pass2=="" || email==""){
        alert("Không được để trống")
        return false
    }
    if(pass1!=pass2){
        alert("2 mật khẩu không trùng khớp")
        return false
    }
    const user ={
      username: name,
      password: pass1,
      email:email
      
    }
    const url='http://localhost:1337/user/'
    const res = await request.request(url,"POST",user)
    const data = await res.json()
    if(data.errDK=='errDK'){
        alert("Tên tài khoản đã tồn tại ")
        return false
    }
    alert("Đăng ký thành công")
    props.history.push("/");
    
  }
  return (
    <div className="popup">
      <div className="popup-inner">
        <h1>Đăng Ký</h1>
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
            <label for="email">Email</label>
            <input
              id = "inputEmail"
              type="text"
              name="email"
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
          <div>
            <label for="password2">Xác nhận lại mật khẩu</label>
            <input
              id ="inputPass2"
              type="password"
              name="password2"
              class="form-control"
            ></input>
          </div>
        </form>
        <button class="btn-submit" onClick={login}  >
          Đăng ký
        </button>
      </div>
    </div>
  );
};

export default SignUp;
