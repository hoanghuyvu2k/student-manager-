import Button from './Button'
const Header = (props) => {
    return (
        <header className="header">
            <h1>{props.title}</h1>
            <Button setTrigger={props.setTrigger} />
        </header>
    )
}
Header.defaultProps ={
    title : 'Quản lý sinh viên',
}
export default Header
