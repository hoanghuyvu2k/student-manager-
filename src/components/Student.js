import {FaTimes} from 'react-icons/fa'
import { MdEdit } from "react-icons/md";
const Student = ({student,onDelete,setTrigger,setStudentid}) => {
    return (
        <div className='student'>
            <h3>{student.name}
           
            <FaTimes className="delete" onClick={() =>{
                
               onDelete(student.id);
            }}/>
             <MdEdit className="edit" onClick={() =>{
                 setTrigger(true)
                 setStudentid(student.id)
            }}/> 
            </h3>
            <h3>{student.maSV}</h3>
        </div>
    )
}

export default Student
// style={{color :'red',cursor: 'pointer' }}