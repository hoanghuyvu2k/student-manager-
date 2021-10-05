
import MainStudent from './MainStudent'
import Validate from './components/Validate'
import SignUp from './components/SignUp'
import CheckOTP from './components/CheckOTP'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
function App() {
  
  
  return (
    <Router>
    <Switch>
      <Route path="/" exact component={Validate} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/otp" exact component={CheckOTP} />
      <Route path="/home" component={MainStudent}/>
    </Switch>
    </Router>
  );
}

export default App;
//rafce
