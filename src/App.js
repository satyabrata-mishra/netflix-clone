import { BrowserRouter, Routes, Route } from "react-router-dom";
import Netflix from "./pages/Netflix";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Player from "./pages/Player";
import Movies from "./pages/Movies";
import Mylist from "./pages/Mylist";


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/netflix" element={<Netflix />} />
          <Route exact path="/player" element={<Player />} />
          <Route exact path="/movies" element={<Movies />} />
          <Route exact path="/mylist" element={<Mylist />} />
        </Routes>
    </BrowserRouter>
  );
}
export default App;
