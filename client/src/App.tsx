import React from 'react';

import { UserList, UserList2, UserList3 } from 'components/UserList';
import 'models/init';
import './App.css';

export const App = () =>  {
  return (
    <div className="App">
      <header className="App-header">
        <div>Test Effector + React + TypeScript here and know</div>
        <div>Scroll down!</div>
      </header>
      <div>
        <h2><b>First example:</b> Click "Add mock user to Effector store" for test Effector store and event</h2>
        <UserList />
      </div>
      <div>
        <h2><b>Second example:</b> Click "Add mock user to Effector store" for test Effector useList hook</h2>
        <UserList2 />
      </div>
      <div>
        <h2><b>Third example:</b> Track request status in component. Try to switch slow or offline network mode in Devtools and refresh this page</h2>
        <UserList3 />
      </div>
    </div>
  );
}
