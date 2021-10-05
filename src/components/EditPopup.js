
import {FaTimes} from 'react-icons/fa'
const Popup = (props) => {
    const onClick =()=>{
       
        var name = document.getElementById('addName').value ;
        var maSV = document.getElementById('addmaSV').value ;
        props.editStudent(name,maSV);
        props.setTrigger(false)
    }
    return(props.trigger) ?(
        <div className="popup">
            <div className="popup-inner">
            <h1>Thêm sinh viên  <FaTimes class="deletePopup" onClick={() => props.setTrigger(false)} /></h1>
           
            <form className="form-control" method="POST" >
                <div>
                    <label for="name">Họ và tên</label>
                    <input id ='addName'type="text" name="name" class="form-control"></input>
                </div>
                <div>
                    <label for="maSV">Mã sinh viên</label>
                    <input id='addmaSV' type="text" name="maSV" class="form-control"></input>
                </div>
                {/* <input type="submit" value="Submit"></input>   */}
            </form>
            <button  class="btn-submit" onClick={onClick}>Submit</button>
            </div>
        </div>
    ):"";
}

export default Popup
