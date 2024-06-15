import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserContext } from "./components/UserContext";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Resume from "./pages/Resume";
import AI from "./pages/AI";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import Travel from "./pages/Travel";
import Account from "./components/Account";
import Checkout from "./pages/Checkout";
import VacationDetails from "./pages/VacationDetails";
import StockPrediction from "./pages/StockAI";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/verify`, {
      method: 'GET',
      credentials: 'include',  // include credentials to send the cookies
    })
    .then(response => response.json())
    .then(data => {
      if (data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    })
    .catch(err => {
      console.error('Error verifying token:', err);
      setUser(null);
    })
    .finally(() => {
      setIsLoading(false);  // set isLoading to false once the request is complete
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Or your custom loading component
  }

  // Include isLoading in the context value
  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Layout />}>
            <Route index element={<Contact />} />
            <Route path="AI" element={<AI />} />
            <Route path="dashboard" element={<Dashboard />} />
            {/* <Route path="contact" element={<Contact />} /> */}
            <Route path="*" element={<NoPage />} />
            <Route path="resume" element={<Resume />} />
            <Route path="login" element={<Home />} />
            <Route path="account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
            <Route path="travel" element={<Travel />} />
            <Route path="predict-stock" element={<StockPrediction />} />
            <Route path="vacation/:id" element={<VacationDetails />} />
            <Route path="checkout/:id" element={<Checkout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
