import Header from "./components/Header";
import StudentList from "./components/StudentList";
import { useState, useEffect } from "react";
import Popup from "./components/Popup";
import EditPopup from "./components/EditPopup";
import { MdAvTimer } from "react-icons/md";
import Student from "./components/Student";
import request from "./service/request"
function MainStudent() {
  const [studentlist, setstudentlist] = useState([]);
  const [buttionPopup, setButtonPopup] = useState(false);
  const [buttionEditPopup, setEditButtonPopup] = useState(false);
  const [idStudent, setIdStudent] = useState("");
  
  const url = "http://localhost:1337/studentmanager/";
  
  const fetchStudents = async () => {
    const res = await request.request(url,"GET")
    const data = await res.json();
    return data;
  };
  const getStudents = async () => {
    const studentsFromServer = await fetchStudents();
    setstudentlist(studentsFromServer);
  };
  useEffect(() => {
    getStudents();
  }, []);

  const deleteStudent = async (id) => {

    const response = await request.request(url+id,"DELETE")
    getStudents();
  };
  const addStudent = async (name, maSV, Class , Major) => {
    const student = {
      name: name,
      maSV: maSV,
      class: Class,
      major: Major
    };
    console.log(student)
    const response = await request.request(url,"POST",student)
    const data = await response.json();
    setstudentlist(data)
  };
  const editStudent = async (name, maSV) => {
    const student = {
      id: idStudent,
      name: name,
      maSV: maSV,
    };
    const response = await request.request(url+idStudent,"PATCH",student)
    const data = await response.json();
    setstudentlist(data)
  };
  
  return (
    <div className="container">
      <Header setTrigger={setButtonPopup} />
      <StudentList
        studentlist={studentlist}
        onDelete={deleteStudent}
        setTrigger={setEditButtonPopup}
        setStudentid ={setIdStudent}
      />
      <Popup
        trigger={buttionPopup}
        setTrigger={setButtonPopup}
         addStudent={addStudent}
      />
      <EditPopup
        trigger={buttionEditPopup}
        setTrigger={setEditButtonPopup}
         editStudent={editStudent}
      />
    </div>
  );
}

export default MainStudent;
//rafce
