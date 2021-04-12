import './App.css';
import React from 'react';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

/* import PivotWebApi from './Components/PivotWebApi' */
import PivotDragDropApiDevExpress from './Components/PivotDragDropApiDevExpress'


class App extends React.Component {
  
  render() {
    return (
      <PivotDragDropApiDevExpress></PivotDragDropApiDevExpress>
    );
  }

}


export default App;
