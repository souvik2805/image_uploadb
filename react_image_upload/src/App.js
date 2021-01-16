import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FilesUploadComponent from './component/FilesUploadComponent';

class App extends React.Component{
  render(){
    return(
    <div className="App">
         <FilesUploadComponent />
    </div>
    );
  }
}
export default App;
