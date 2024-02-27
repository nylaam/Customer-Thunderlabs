import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import Submit from './pages/Submit';
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} exact></Route>
        <Route path="/submit" element={<Submit />}></Route>
        <Route path="/dash" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;