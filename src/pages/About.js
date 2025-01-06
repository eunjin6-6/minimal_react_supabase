import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div>
      <Header />
      <main className="content">
        <div className="container about_content shadow">
              <h3 className="heading6">About Me</h3>
              <p className="narrow-p">I'm a web designer based in Romania. I create clean websites, love Apple products and I’m a big fan of trance music.
              </p>            
              <p className="narrow-p">
                  Wanna get in touch? Do a quick scroll to the bottom of the page. It’s all there :) 
              </p>
              <hr className="double"/>
              <h4 className="heading4 available">I'm currently available for freelance projects.</h4>        
              <h4 className="heading4 rate">Rates start at $50/hour.</h4>    
              <p className="portfolio_link">
                  <a href="/" className="primary-btn">See my portfolio</a>
              </p>  
          </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
