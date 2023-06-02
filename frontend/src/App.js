import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import List from './pages/list/List';
import Schedule from './pages/schedule/Schedule';
import Login from './pages/login/Login';
import ListTest from './pages/listTest/listTest';
import ListTest2 from './pages/listTest/listTest2';
import Reference from './pages/reference/Reference';
import ViewList from './pages/viewList/ViewList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/listtest" element={<ListTest />} />
        <Route path="/listtest2" element={<ListTest2 />} />
        <Route path="/list/:userid/:id" element={<Schedule />} />
        <Route path="/list/:id" element={<ViewList />} />
        <Route path="/login" element={<Login isLogin={true} />} />
        <Route path="/register" element={<Login isLogin={false} />} />
        <Route path="/reference" element={<Reference />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
