// const onclick = () =>{
//     console.log("click")
// }
const Button = (props) => {
    return (
        <div>
              <button className="btn" onClick= {() => props.setTrigger(true)} >Add</button>
        </div>
    )
}

export default Button

