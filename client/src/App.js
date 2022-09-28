import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './component/Home';
import Detail from './component/Detail';
import Create from './component/Create';
import LandingPage from './component/LandingPage';
import Error404 from './component/Error404';

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/home/:id' component={Detail} />
          <Route exact path='/videogames' component={Create} />
          <Route path="*" component={Error404}/>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
