import './App.css';
import React from 'react';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

/* import PivotWebApi from './Components/PivotWebApi' */
import PivotCsv from './Components/PivotCsv'


class App extends React.Component {
  
  render() {
    return (
      <PivotCsv></PivotCsv>
    );
  }

}


export default App;
