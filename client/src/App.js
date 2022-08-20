import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/views/Homepage/Homepage';
import NotFound from './components/views/NotFound/NotFound';

const App = () =>  {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage/>}/>
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;
