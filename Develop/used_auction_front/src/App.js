import "./App.css";
import { Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import SearchPage from './pages/SearchPage';
import EnrollPage from "./pages/EnrollPage";

const App = () => {
  return (
    <>
      <Helmet>
        <title>USED_AUCTION</title>
      </Helmet>
      <div className="App">
        <header className="App-header">
          <p>USER-Auction-System</p>
        </header>
      </div>

      <Route component={LandingPage} path={["/@:username", "/"]} exact />
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={AdminPage} path="/admin" />
      <Route component={SearchPage} path='/search' />
      <Route component={EnrollPage} path='/enroll' />
    </>
  );
};

export default App;
