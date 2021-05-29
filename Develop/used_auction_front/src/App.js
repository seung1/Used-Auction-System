import "./App.css";
import { Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
//import AdminPage from "./pages/AdminPage";
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
      
      {/*http://localhost:3000/@dongkwon 같은 경로에서 dongkwon을 username 파라미터로 읽을 수 있게 해줌*/}
      {/*<Route component={AdminPage} path={['/admin/@:username', '/']} exact />*/}

      <Route component={UserList} path="/admin" />
    </>
  );
};

export default App;
