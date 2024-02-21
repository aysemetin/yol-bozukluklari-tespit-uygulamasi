
import Navbar from "./components/Navbar";
import SiteRoutes from "./SiteRoutes";

import "./App.css";
import Footer from "./components/Footer";

function App() {
  

 

  return (
    <>
      <Navbar  />
      <div className="container">
        <div className="col-sm-12">
          <SiteRoutes />
          
        </div>
        
      </div>
      <Footer/>
    </>
  );
}

export default App;
