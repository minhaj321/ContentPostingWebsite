import './App.css';
import {BrowserRouter as Router,Route} from "react-router-dom";
import SignUp from "./components/signup.jsx";
import Login from './components/login.jsx';
import ContentPost from './components/contentpost.jsx';
import ContentList from './components/contentlist.jsx';
import Dashboard from './components/dashboard.jsx';
function App() {

  return (
 
    <Router>
    <Route exact path='/' component={Login} />
    <Route path='/signup' component={SignUp} />
    <Route path='/contentlist' component={ContentList} />
    <Route path='/contentpost' component={ContentPost} />
    <Route path='/dashboard' component={Dashboard} />
    </Router>

    );
}

export default App;
