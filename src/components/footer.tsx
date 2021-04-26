import React from "react";
import { StaticImage } from "gatsby-plugin-image";

export const Footer = () => {
  const links = ["async-stripe", "aiobreaker", "bluenoise-rs"].map((name, index) => (
    <li key={index}><a href={`https://github.com/arlyon/{name}`}>{name}</a></li>
  ));
  return (
    <footer className="mt-auto pt-16">
      <div className="flex flex-col justify-between max-w-4xl p-4 mx-auto md:p-8">
        <div className="flex flex-wrap">
          <div className="min-w-max pt-4 mr-16">
            <StaticImage
              src="../images/logo.png"
              alt="Bottom logo"
              width={96}
            />
          </div>
          <div className="flex-1 flex mr-4 flex-wrap">
            <div className="flex-1 min-w-max pt-4">
              <p className="font-bold mb-1">OUR INVOLVEMENT</p>
              <ul>{links}</ul>
            </div>
            <div className="flex-1 min-w-max pt-4 mr-4">
              <p className="font-bold mb-1">WHAT WE DO</p>
              <ul>
                <li>Technical Consulting</li>
                <li>Architecture & Design</li>
                <li>Cloud Solutions</li>
                <li>Proof of Concepts</li>
                <li>Free For Non-Profits</li>
              </ul>
            </div>
            <div className="flex-1 min-w-max pt-4">
              <p className="font-bold mb-1">GET IN TOUCH</p>
              <a className="underline" href="mailto:alex@foundries.dev">
                alex@foundries.dev
              </a>
              <br />
              Lyon Foundries
              <br />
              13A Clermiston Rd N<br />
              Edinburgh
            </div>
          </div>
        </div>
        <p className="mt-16">
          We're always looking for good people. If you want to work flexibly on
          the cutting edge send us a message.
        </p>
        <hr className="my-16" />
        <div className="text-center mb-8">Copyright 2021 - Lyon Foundries</div>
      </div>
    </footer>
  );
};
