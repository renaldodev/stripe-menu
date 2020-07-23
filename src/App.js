import React from "react";
import GlobalStyles from "./styles/GlobalStyles"
import Layout from "./components/Layout"
import Navbar from "./components/Navbar"
function App() {
  return (
   <React.Fragment>
     <GlobalStyles/>
     <Layout>
       <Navbar/>
       <h1>Renaldo</h1>
     </Layout>
   </React.Fragment>
  );
}

export default App;
