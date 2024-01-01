import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './Pages/Home';
import ChatPage from './Pages/ChatPage';
import { ModeState } from './Context/ModeProvider';

function App() {
  const {mode} = ModeState();

  return (
    <div className="App" style={{backgroundColor: mode === "light" ? "#AFEEEE" : "#696969",}}>
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/chats' element={<ChatPage/>} />
      </Routes>
    </div>
  );
}

export default App;
