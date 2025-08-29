import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Home} from "./components/Home";
import About from "./components/About";
import Description from "./components/Description";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/noteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
    const [alert,setalert]=useState(null)
    const showAlert=(message,type)=>{
        setalert({
            msg:message,
            type:type,
        })
       setTimeout(()=>{
        setalert(null)
       },1500);
    }
    return (
        <>
          <NoteState>
              <BrowserRouter>
                  <Navbar />
                  <Alert alert={alert} />
                  <Routes>
                      <Route path="/" element={<Home showAlert={showAlert}/>} />
                      <Route path="/about" element={<About />} />
                      <Route path="/login" element={<Login showAlert={showAlert}/>} />
                      <Route path="/signup" element={<Signup showAlert={showAlert}/>} />
                      <Route path="/description" element={<Description />} />
                  </Routes>
              </BrowserRouter>
          </NoteState>
        </>
    );
}

export default App;
