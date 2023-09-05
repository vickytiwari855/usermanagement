import React, { useState } from 'react';
import './App.css';
import UserList from './users/UserList';
import Roles from './Roles/Roles';

function App() {

  return (
    <>
      <div style={{ textAlign:'center'}}>
        <img height={200} width={350} src={'https://global-uploads.webflow.com/61779d9f8a0e58e8a7c30199/619e563d3af76032150013da_NvizionSolutions-2020-Logo-Blue-WhiteBg.png'}
          alt={'image '}
        />
      </div>
      <UserList />
      <Roles />
    </>
  );
}

export default App;
