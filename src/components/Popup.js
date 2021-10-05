import { FaTimes } from "react-icons/fa";
import request from "../service/request";
import { useState, useEffect } from "react";
const Popup = (props) => {
  const onClick = () => {
    var name = document.getElementById("addName").value;
    var maSV = document.getElementById("addmaSV").value;
    var Class = document.getElementById("lop").value;
    var Major = document.getElementById("majors").value;
    props.addStudent(name, maSV,Class,Major);
    props.setTrigger(false);
  };
  const [listMajor, setListMajor] = useState([]);
  const [listClass, setListClass] = useState([]);
  const [listClassMajor, setListClassMajor] = useState([])
  const getMajor = async () => {
    const url = "http://localhost:1337/major/";
    const res = await request.request(url, "GET");
    const data = await res.json();
    setListMajor(data);
  };
  const getClass = async () => {
    const url = "http://localhost:1337/class/";
    const res = await request.request(url, "GET");
    const data = await res.json();
    setListClass( data);
  };
  const getFirstClass=() =>{
    var x = 'CNTT'
    var arr=[]
    listClass.forEach((Class)=>{
        if(Class.major==x){
            arr.push(Class)
        }
    })
    setListClassMajor(arr)
  }
  useEffect(() => {
    getMajor();
    getClass();
    
  }, []);
  useEffect(()=>{
    getFirstClass()
  },[props.trigger]);
  const checkClass = () => {
    
    var x = document.getElementById("majors").value
    var arr=[]
    listClass.forEach((Class)=>{
        if(Class.major==x){
            arr.push(Class)
        }
    })
    setListClassMajor(arr)
  };
  console.log(listMajor);
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <h1>
          Thêm sinh viên{" "}
          <FaTimes
            class="deletePopup"
            onClick={() => {
              getFirstClass()
              props.setTrigger(false)}}
          />
        </h1>

        <form className="form-control" method="POST">
          <div>
            <label for="name">Họ và tên</label>
            <input
              id="addName"
              type="text"
              name="name"
              class="form-control"
            ></input>
          </div>
          <div>
            <label for="maSV">Mã sinh viên</label>
            <input
              id="addmaSV"
              type="text"
              name="maSV"
              class="form-control"
            ></input>
          </div>
          <div>
            <label for="major">Chọn ngành</label>
            <select
              name="major"
              id="majors"
              className="optionMajor"
              onChange= {checkClass}
            >
              {listMajor.map((major) => (
                <option value={major.name}>{major.name}</option>
                
              ))}
            </select>
          </div>
          <div>
            <label for="Class">Chọn lớp</label>
            <select
              name="Class"
              id="lop"
              className="optionMajor"
              onChange={checkClass}
            >
              {listClassMajor.map((Class) => (
                <option value={Class.name}>{Class.name}</option>
              ))}
            </select>
          </div>
        </form>
        <button class="btn-submit" onClick={onClick}>
          Submit
        </button>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
