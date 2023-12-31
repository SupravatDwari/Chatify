import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './Pages/Home';
import ChatPage from './Pages/ChatPage';
import { ModeState } from './Context/ModeProvider';

function App() {
  const {mode} = ModeState();

  return (
    <div className="App" style={{backgroundImage: mode=='light'?'url(' + require('./bg.jpg') + ')': 'url(' + require('./dark-bg.jpg') + ')',backgroundAttachment: "fixed",}}>
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/chats' element={<ChatPage/>} />
      </Routes>
    </div>
  );
}

export default App;
