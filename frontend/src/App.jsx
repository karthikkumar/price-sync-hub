import FileUpload from './FileUpload';
import Search from './Search';

import './App.css'

function App() {
  return (
    <div className='App'>
      <div>
        <h1>PriceSync Hub</h1>
      </div>
      <div className="card">
        <FileUpload/>
      </div>
      <hr/>
      <div className="card">
        <Search/>
      </div>
    </div>
  )
}

export default App;
