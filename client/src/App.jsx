import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Headers from "./components/Headers"

function App() {
  return(
    <BrowserRouter>
       <Headers/>
       <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path="/signin" element={<Signin></Signin>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/projects" element={<Projects></Projects>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
