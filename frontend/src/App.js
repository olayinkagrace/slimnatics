import "./App.css";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from "./Screens/Home";
import Signin from "./Screens/Signin";
import Signup from "./Screens/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const {user} = useAuthContext()
  return (
    <BrowserRouter>
     <Navbar />
      <Routes>
        <Route path='/login' element={!user ? <Signin /> : <Navigate to='/' /> } />
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
        <Route path='/' element={user ? <Home /> : <Navigate to= '/login' />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
