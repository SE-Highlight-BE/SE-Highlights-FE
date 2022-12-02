import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.css";
import NavigationBar from "./components/navigationBar";
import Homepage from "./pages/homepage";
import Login from "./pages/login";
import Mypage from "./pages/mypage";
import Schedule from "./pages/schedule/schedule";
import Search from "./pages/search";
import Signup from "./pages/signup";
import Playvideo from "./pages/playvideo/playvideo";
import { useUser } from "./stores/user";
function App() {
  const { login } = useUser();
  return (
    <>
      <BrowserRouter>
        {/* {cookies.load("userid") === undefined ? <div></div> : <NavigationBar />} */}
        {login && <NavigationBar />}
        <Routes>
          <Route path="/" exact element={<Login />}></Route>
          <Route path="/login" exact element={<Login />}></Route>
          <Route path="/login/signup" exact element={<Signup />}></Route>
          <Route path="/homepage" exact element={<Homepage />}></Route>
          <Route path="/playvideo" exact element={<Playvideo />}></Route>
          <Route path="/schedule" exact element={<Schedule />}></Route>
          <Route path="/search" exact element={<Search />}></Route>
          <Route path="/mypage" exact element={<Mypage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
