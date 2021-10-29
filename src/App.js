import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

// @ import the Components
import Header from "./components/Header";
import MainHome from "./components/MainHome";
import PostDetail from "./components/PostDetail";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="position-relative">
        <Header />
        <div className="container" style={{ paddingBottom: "100px" }}>
          {/* Routing */}
          <Route exact path="/" component={MainHome} />
          <Route exact path="/post/:postId/" component={PostDetail} />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
