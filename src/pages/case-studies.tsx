import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";

import { SEO } from "../components/seo";

import rust from "../images/rust-lang-icon.svg";
import typescript from "../images/typescript.svg";
import graphqlIcon from "../images/graphql.svg";
import tensorflow from "../images/tensorflow.svg";

function CaseStudies() {
  const { workout } = useStaticQuery(graphql`
    query {
      workout: file(relativePath: { eq: "workout-mockup.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Case Studies"
      />
      <section className="flex flex-wrap justify-center">
        <Img
          className="m-12"
          style={{
            filter: "drop-shadow(-0.5em 0 1em rgba(0, 16, 255, 0.2))",
            width: "200px",
          }}
          fluid={workout.childImageSharp.fluid}
        />
        <div className="flex flex-1 flex-col justify-center min-w-min">
          <h2 className="text-2xl font-bold mb-4" style={{ minWidth: "200px" }}>
            Fulcrum Fitness App
          </h2>
          <TechFlags
            className="mb-4"
            tech={[
              { name: "Rust", color: "bg-yellow-900", icon: rust },
              { name: "Typescript", color: "bg-blue-700", icon: typescript },
              { name: "GraphQL", color: "bg-pink-600", icon: graphqlIcon },
              { name: "Tensorflow", color: "bg-yellow-500", icon: tensorflow },
            ]}
          />
          <p className="mb-4">
            We were approached by a small team in Edinburgh looking to build an
            MVP for their business, tying health data with personal fitness to
            simplify the lives of personal trainers and professional athletes.
          </p>
          <p className="mb-4">
            This service collects core metrics from existing services such as
            Apple Health or Google Fit which are then processed by the unique
            virtual trainer AI that presents trends to coaches and athletes to
            help them make the most of their fitness plan.
          </p>
          <p>
            Inspired?{" "}
            <a className="underline" href="mailto:alex@foundries.dev">
              Get in touch.
            </a>
          </p>
        </div>
      </section>
    </>
  );
}

const TechFlags = ({ tech, className = "" }) => {
  const tags = tech.map(({ name, color, icon }) => (
    <div
      className={`${color} px-4 rounded-2xl flex flex-row m-1 justify-center items-center`}
    >
      <img style={{ height: "1em", marginRight: 4 }} src={icon} />
      {name}
    </div>
  ));

  return (
    <div className={className}>
      <div className="flex flex-wrap -mx-1">{tags}</div>
    </div>
  );
};

export default CaseStudies;
