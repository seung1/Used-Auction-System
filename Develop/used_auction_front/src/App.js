import "./App.css";
// import { Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";
// import LoginPage from "./pages/LoginPage";
/* <Route component={LoginPage} path="/login" /> */
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
    </>
  );
};

export default App;
