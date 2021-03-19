import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import './App.css';
import Branch from './components/Branch/Branch';
import DefaultBranch from './components/Branch/DefaultBranch';
import BranchesList from './components/BranchesList/BranchesList';
import branchReducer from './reducers/branchReducer';

const store = createStore(branchReducer)

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <header id='page-header'>Test Quiz</header>
        <div id='left-block'></div>
        <div id='right-block'></div>
        <div id='main-block'>
          <Provider store={store}>
            <Switch>
              <Route path='/default-branch/' component={DefaultBranch} />
              <Route path='/branch/:id' component={Branch} />
              <Route path='/' component={BranchesList} exact />
            </Switch>
          </Provider>
        </div>
        <footer id='page-footer'></footer>
      </BrowserRouter>
    </div>
  )
}

export default App
