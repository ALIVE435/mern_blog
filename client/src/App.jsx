import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Headers from "./components/Headers"
import FooterComponent from "./components/Footer"
import PrivateRoute from "./components/PrivateRoute"
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute"
import CreatePost from "./pages/CreatePost"
import PostPage  from "./pages/PostPage"
import ScrollToTop from "./components/ScrollToTop"
import Search from "./pages/SearchPage"

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Headers />
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route element={<PrivateRoute />}>   {/*protecting dashboard route */}
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>   {/*protecting createPost route */}
          <Route path="/create-post" element={<CreatePost/>}></Route>
        </Route>

        <Route path="/signin" element={<Signin></Signin>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/projects" element={<Projects></Projects>}></Route>
        <Route path="/search" element={<Search></Search>}></Route>
        <Route path="/post/:postSlug" element={<PostPage></PostPage>}></Route>
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  )
}

export default App
