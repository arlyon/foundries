import React from "react";
import { Link } from "gatsby";

import foundryLogo from "../images/foundry.svg";
import { SEO } from "../components/seo";

function IndexPage() {
  const values = {
    ["Community First"]: (
      <>
        Our aim is technical excellence and the furthering of the industry. We
        put Open Source first, utilising the immense power in the community to
        build fast, reliable software for humanity. If the idea of cutting edge
        solutions leveraging and supporting Open Source communities excites you,
        we&apos;d love to talk.{" "}
        <Link
          style={{ textDecoration: "underline" }}
          key={"Contact"}
          to={"/contact"}
        >
          Get in touch
        </Link>
        .
      </>
    ),
    ["Quality Engineering"]: (
      <>
        Often, the best software is the code you never notice. It doesn&apos;t
        crash, it doesn&apos;t drop out. It just works. We pick the tools that
        just work, which means no expensive maintenance plan, and no need to
        call out one of our engineers at 3am to diagnose a buggy service. This
        is why we are constantly investing in new technologies such as Rust to
        keep ahead of the curve.
      </>
    ),
    ["Happy People"]: (
      <>
        Happy people make the best code. That is why we allow our engineers to
        spend 20% of their time exploring their own interests at work. That way,
        you know that the people doing the job are personally interested in
        seeing it succeed, because they want to be there. Simple.
      </>
    ),
  };

  return (
    <>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />
      <section>
        <div className="text-center">
          <h1 className="text-white text-6xl font-bold mt-20 md:text-8xl">
            The Foundries
          </h1>
          <h2 className="text-white text-4xl mt-6">
            Professional Consulting Services <br />
            To Put You On The Map
          </h2>
        </div>
        <p className="text-lg mt-32">
          We offer consultancy and technical analysis across multiple domains in
          the software industry. Our team has experience with the entire
          technical stack from hardware to cloud to the browser. Don&apos;t fit
          into these boxes?{" "}
          <Link
            style={{ textDecoration: "underline" }}
            key={"Contact"}
            to={"/contact/"}
          >
            Get in touch
          </Link>{" "}
          and we&apos;ll put you in contact with someone free of charge.
        </p>
        <div className="flex justify-center mt-16 text-2xl font-bold flex-wrap max-w-xl mx-auto">
          <a
            className="bg-yellow-600 px-4 py-2 mx-4 my-2 flex-1 text-center min-w-max"
            href="mailto:alex@foundries.dev"
          >
            Contact Us
          </a>
          <Link
            key={"Case Studies"}
            to={"/case-studies/"}
            className="bg-indigo-600 px-4 py-2 mx-4 my-2 flex-1 text-center min-w-max"
          >
            See Past Projects
          </Link>
        </div>
      </section>
      <section className="mt-32">
        <h2 className="text-white font-bold text-5xl my-16 text-center">
          <img
            className="inline-block w-16 mr-4"
            src={foundryLogo}
            alt="Foundry icon"
          />
          Core Values
        </h2>
        {Object.entries(values).map(([title, elem]) => (
          <div className="flex mt-8 flex-col sm:flex-row" key={title}>
            <h3 className="flex-1 mb-4 mr-8 sm:text-right text-3xl">{title}</h3>
            <p className="flex-1 text-lg">{elem}</p>
          </div>
        ))}
      </section>
    </>
  );
}

export default IndexPage;
