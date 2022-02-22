// import React from 'React';
// import './App.css';

import { useContext } from 'react';
import { useInRouterContext } from 'react-router';
import AfterLoginHome from './components/AfterLogin/AfterLoginHome';
import Initial from './components/login/Initial';
import Test from './components/test/Test';
import UserState from './context/user/userstate';
import userContext from './context/user/usercontext';

import React from 'react'


function Display() {
  var login=false
  const a = useContext(userContext)

  return (
    <>
      {localStorage.authToken?<AfterLoginHome/>: <Initial />}

      {/* <Test/> */}
      {/* <AfterLoginHome /> */}



    </>
  )
}


function App() {
  return (

    <UserState>


      <Display />

    </UserState>
  );
}

export default App;
