import "./App.css";
import { Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import UserList from "./pages/UserList";

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
      <Route component={UserList} path="/admin" />
    </>
  );
};

export default App;
