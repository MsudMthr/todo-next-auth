import React from "react";
import Footer from "./Footer";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <div className=" min-h-screen bg-gray-100">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
