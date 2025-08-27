import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Description from "./components/Description";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/noteState";
// import { Alert } from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
    return (
        <>
          <NoteState>
              <BrowserRouter>
                  <Navbar />
                  {/* <Alert msg="This is inotebook"/> */}
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/description" element={<Description />} />
                  </Routes>
              </BrowserRouter>
          </NoteState>
        </>
    );
}

export default App;
