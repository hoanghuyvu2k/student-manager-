import { Link } from "react-router-dom";
import request from "../service/request";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const CheckOTP = (props) => {
  const [timer, setTimer] = useState("");
  var interval 

  const startTimer = () => {
    let a = 6;

    interval = setInterval(() => {
      a = a - 1;
      if (a < 1) {
        clearInterval(interval);
        setTimer("");
      } else {
        setTimer(a);
      }
    }, 1000);
  };
  const run = async () => {
    if(timer==""){
    startTimer();
    const user = {
      username: sessionStorage.username,
    };
    const url = "http://localhost:1337/user/resendOTP";
    const res = await request.request(url, "POST", user);
    const data = res.json()
    if(data.err ="da gui lai") alert("Đã gửi lại")
    }
  };
  

  const login = async () => {
    const user = {
      otp: document.getElementById("inputUser").value,
      username: sessionStorage.username,
    };
    const url = "http://localhost:1337/user/checkOTP";
    const res = await request.request(url, "POST", user);
    const data = await res.json();
    if (data.err == "saiOTP") alert("Sai ma OTP");
    else if ((data.err == "OTP het han"))
      alert("OTP này đã hết hạn vui lòng gửi lại ");
    else {
      sessionStorage.token = data;
      props.history.push("/home");
    }
  };
  return (
    <div className="popup">
      <div className="popup-inner">
        <h1>Xác thực OTP </h1>
        <form className="form-control">
          <div>
            <label for="user">Nhập mã otp bạn nhận được</label>
            <input
              id="inputUser"
              type="text"
              name="user"
              class="form-control"
            ></input>
          </div>
        </form>
        <button class="btn-submit" onClick={login}>
          Submit
        </button>
        <button class="btn-submit" onClick={run}>
          Gửi lại mã OTP {timer}
        </button>
      </div>
    </div>
  );
};

export default CheckOTP;
