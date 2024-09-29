import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
import ToDoData from "./components/ToDoData";
import About from "./pages/About";

function App() {
  return (
    <div className="font-poppins overflow-hidden">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/to-do-list" element={<ToDoData />} />
          <Route path="/auth" element={<Authentication />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
