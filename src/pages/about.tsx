import { graphql, useStaticQuery } from "gatsby";
import React, { FC } from "react";
import Img from "gatsby-image";

import { SEO } from "../components/seo";

function AboutPage() {
  const { arlyon } = useStaticQuery(graphql`
    query {
      arlyon: file(relativePath: { eq: "arlyon.jpeg" }) {
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
        title="About"
      />
      <section className="items-center md:flex-row">
        <p>
          We're a small firm delivering bespoke services to clients across
          Europe and the United States. We started in early 2020 as a
          no-bullshit response to much of the bloated buzzwordy consultancy
          available today. Our pitch is simple: we are engineers for engineers.
          We provide quality without the expensive bloat.
        </p>
        <h2 className="text-4xl mt-16 text-center">Team</h2>
        <section className="mt-16 flex justify-center align-middle">
          <PersonCard
            name="Alexander"
            desc="A tech, privacy, and open source enthusiast specialising in distributed systems."
            image={arlyon.childImageSharp.fluid}
          />
        </section>
      </section>
    </>
  );
}

export default AboutPage;

type PersonCardProps = {
  name: string;
  desc: string;
  image: any;
};

const PersonCard: FC<PersonCardProps> = (props) => {
  return (
    <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4">
      <Img fluid={props.image} alt="Photo of the team member." />
      <div className="flex items-center px-6 py-3 bg-gray-900">
        <div
          style={{
            borderRadius: 50,
            backgroundColor: "#3bbb43",
            width: 16,
            height: 16,
          }}
        />
        <h1 className="mx-3 text-white font-semibold text-lg">Writing Rust</h1>
      </div>
      <div className="py-4 px-6">
        <h1 className="text-2xl font-semibold text-gray-800">{props.name}</h1>
        <p className="py-2 text-lg text-gray-700">{props.desc}</p>
        <div className="flex items-center mt-4 text-gray-700">
          <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
            <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z" />
          </svg>
          <p className="px-2 text-sm">Edinburgh</p>
        </div>
        <div className="flex items-center mt-4 text-gray-700">
          <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
            <path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z" />
          </svg>
          <p className="px-2 text-sm">alex@foundries.dev</p>
        </div>
      </div>
    </div>
  );
};
