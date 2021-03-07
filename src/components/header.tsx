import { graphql, useStaticQuery, Link } from "gatsby";
import React, { useState } from "react";
import { StaticImage } from "gatsby-plugin-image";

export const Header = () => {
  const [isExpanded, toggleExpansion] = useState(false);
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const routes = [
    {
      route: `/about/`,
      title: `About`,
    },
    {
      route: `/case-studies/`,
      title: `Case Studies`,
    },
    // {
    //   route: `/contact`,
    //   title: `Contact`,
    // },
  ].map((link) => (
    <Link
      className="block mt-4 text-white no-underline md:inline-block md:mt-0 md:ml-6"
      key={link.title}
      to={link.route}
      getProps={({ isCurrent }) =>
        isCurrent ? { style: { textDecoration: "underline" } } : null
      }
    >
      {link.title}
    </Link>
  ));

  return (
    <header>
      <div className="flex flex-wrap items-center justify-between max-w-4xl p-4 mx-auto md:p-8 md:border-b">
        <Link to="/">
          <h1 className="flex items-center text-white no-underline">
            <StaticImage
              src="../images/logo.png"
              alt="Bottom logo"
              width={32}
              className="mr-2"
            />
            <span className="text-xl font-bold tracking-tight">
              {site.siteMetadata.title}
            </span>
          </h1>
        </Link>

        <button
          className="items-center block px-3 py-2 text-black border bg-white rounded md:hidden"
          onClick={() => toggleExpansion(!isExpanded)}
        >
          <svg
            className="w-3 h-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>

        <nav
          className={`overflow-hidden md:block md:items-center w-full md:w-auto max-h-0 md:max-h-20`}
          style={{
            maxHeight: isExpanded ? routes.length * 40 : undefined,
            transition: "max-height 0.25s ease-in-out",
          }}
        >
          {routes}
        </nav>
      </div>
    </header>
  );
};
