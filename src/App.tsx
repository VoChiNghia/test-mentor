import React from 'react';
import { unstable_HistoryRouter as HistoryRouter,Route,Routes} from 'react-router-dom'
import Login from './page/Login';
import Register from './page/Register';
import { createBrowserHistory } from "@remix-run/router";
import Home from './page/Home';
import CreateProject from './page/CreateProject';
import { USER_LOGIN, getStoreJson } from './util/config';
import ModalHoc from './HOC/ModalHoc';
import CreateTask from './page/CreateTask';
import ProjectDetail from './page/ProjectDetail';

export const history = createBrowserHistory({ v5Compat: true });
function App() {

  const user = getStoreJson(USER_LOGIN)
  
  if(!user){
    history.push('/login')
  }else{
    history.push('/')
  }
  return (
    <div className="App">
      <HistoryRouter history={history}>
        <Routes>
        <Route index element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/create" element={<CreateProject/>}/>
          <Route path="/create-task" element={<CreateTask/>}/>
          <Route path="/project/:id" element={<ProjectDetail/>}/>

        </Routes>
      </HistoryRouter>
      <ModalHoc/>
    </div>
  );
}

export default App;
