import React from "react";
import Hero from "./Hero";
import About from "./About";
import Values from "./Values";
import Contact from "./Contact";
import { Helmet } from "react-helmet";

const Landing = () => {
  return (
    <div className="top-16 relative">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Community Name</title>
      </Helmet>
      <Hero />
      <About />
      <hr />
      <Values />
      <hr />
      <Contact />
      <footer className="text-center text-gray-400">
        <span>Copyright © 2023 ekiztk@github.com</span>
      </footer>
    </div>
  );
};

export default Landing;
