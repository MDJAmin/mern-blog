import "./App.css";
import Posts from "./BlogPost";
import NavBar from "./NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<p>Login</p>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
