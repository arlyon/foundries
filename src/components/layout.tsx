import PropTypes from "prop-types";
import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import Img from "gatsby-image";

import BackgroundImage from 'gatsby-background-image'

import Header from "./header";

function Layout({ children }) {

  const {file, lion} = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "cartographer.png" }) {
        childImageSharp {
          fluid(background: "transparent") {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      lion: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fixed(width: 100, height: 100, fit: CONTAIN, background: "transparent") {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <div className="flex flex-col min-h-screen font-sans text-white bg-gradient-to-b from-black to-yellow-700">
      <BackgroundImage
        Tag="section"
        fluid={file.childImageSharp.fluid}
        style={{backgroundRepeat: "repeat", backgroundSize: "unset", opacity: undefined, filter: "contrast(2) brightness(1.6)", position: "fixed",
        height: "100%", width: "100%"}}
      >      
      </BackgroundImage>
      <div style={{zIndex: 10, display: "flex", flexDirection: "column", flex: 1}}>
        <Header />
        <main className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
          {children}
        </main>
        <footer className="mt-auto pt-16">
          <div className="flex flex-col justify-between max-w-4xl p-4 mx-auto md:p-8">
            <div className="flex flex-wrap space-x-8">
              <div className="flex-1 min-w-max pt-4">
                <Img fixed={lion.childImageSharp.fixed} />
              </div>
              <div className="flex-1 min-w-max pt-4">
                <p className="font-bold mb-1">OUR INVOLVEMENT</p>
                <ul>
                  <li>async-stripe</li>
                  <li>aiobreaker</li>
                  <li>bluenoise-rs</li>
                </ul>
              </div>
              <div className="flex-1 min-w-max pt-4">
                <p className="font-bold mb-1">WHAT WE DO</p>
                <ul>
                  <li>Technical Consulting</li>
                  <li>Architecture & Design</li>
                  <li>Cloud Solutions</li>
                  <li>Proof of Concepts and MVPs</li>
                  <li>Pro Rata For Non-Profits</li>
                </ul>
              </div>
              <div className="flex-1 min-w-max pt-4">
                <p className="font-bold mb-1">GET IN TOUCH</p>
                <Link className="underline" to="mailto:alex@foundries.dev">alex@foundries.dev</Link><br/>
                Lyon Foundries<br/>
                13A Clermiston Rd N<br/>
                Edinburgh<br/><br/> 
                We're always looking for<br/> 
                good people.
              </div>
            </div>
            <hr className="my-16"/>
            <div className="text-center mb-8">
              Copyright 2021 - Lyon Foundries
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
