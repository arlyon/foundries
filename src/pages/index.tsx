import React from "react";
import { Link } from "gatsby";
import foundryLogo from "../images/foundry.svg";

import Layout from "../components/layout";
import SEO from "../components/seo";

function IndexPage() {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />

      <section>
        <div className="text-center">
          <h1 className="text-white text-8xl font-bold mt-20">The Foundries</h1>
          <h2 className="text-white text-4xl mt-6">Professional Consulting Services That <br/>Will Put You On The Map</h2>
        </div>
        <p className="text-lg mt-32">
          We offer consultancy and technical analysis across multiple domains in the software industry. 
          Our team has experience with the entire technical stack from hardware to cloud to the browser.
          Don't fit into these boxes? <Link style={{textDecoration: "underline"}} key={"Contact"} to={"/contact"}>Get in touch</Link> and 
          we'll put you in contact with someone free of charge.
        </p>
      </section>
      <section className="mt-32">
        <h2 className="text-white text-6xl my-16 text-center">
          <img className="inline-block w-16 mr-4" src={foundryLogo} />
          Core Values
        </h2>
        <div className="flex mt-8 space-x-8">
          <h3 className="flex-1 text-right text-4xl">Community First</h3>
          <p className="flex-1 text-lg">
            Our aim is technical excellence and the furthering of the industry. We put Open Source first,
            utilising the immense power in the community to build fast, reliable software for humanity.
            If the idea of cutting edge solutions leveraging and supporting Open Source communities excites
            you, we'd love to talk. <Link style={{textDecoration: "underline"}} key={"Contact"} to={"/contact"}>Get in touch</Link>.
          </p>
        </div>
        <div className="flex mt-8 space-x-8">
          <h3 className="flex-1 text-right text-4xl">Quality Engineering</h3>
          <p className="flex-1 text-lg">
            Often, the best software is the code you never notice. It doesn't crash, it doesn't drop out.
            It just works. We pick the tools that just work, which means no expensive maintenance plan,
            and no need to call out one of our engineers at 3am to diagnose a buggy service. This is why
            we are constantly investing in new technologies such as Rust to keep ahead of the curve.
          </p>
        </div>
        <div className="flex mt-8 space-x-8">
          <h3 className="flex-1 text-right text-4xl">Happy People</h3>
          <p className="flex-1 text-lg">
            Happy people make the best code. That is why we allow our engineers to spend 20% of their time
            exploring their own interests at work. That way, you know that the people doing the job are
            personally interested in seeing it succeed, because they want to be there. Simple.
          </p>
        </div>
      </section>
    </Layout>
  );
}

export default IndexPage;
