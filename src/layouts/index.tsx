import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";

import { Header } from "../components/header";
import { Footer } from "../components/footer";

const addImage = (src): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

const draw = (canvas: HTMLCanvasElement, highlight, x, y) => {
  const ctx = canvas.getContext("2d");
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  const nearestX = Math.round(x/500) * 500;
  const nearestY = Math.round(y/499) * 499;

  ctx.drawImage(highlight, nearestX, nearestY);
  ctx.drawImage(highlight, nearestX - 500, nearestY);
  ctx.drawImage(highlight, nearestX, nearestY - 499);
  ctx.drawImage(highlight, nearestX - 500, nearestY - 499);

  const gradient = ctx.createRadialGradient(x, y, 0, x, y, 300);
  gradient.addColorStop(0, "#b45309");
  gradient.addColorStop(1, "transparent");

  ctx.globalCompositeOperation = "source-in";
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
};

const Layout: FC = ({ children }) => {
  const canvasRef = useRef();
  const [highlight, setImage] = useState<HTMLImageElement>();
  const [[mouseX, mouseY], setMouseLoc] = useState([1000000, 1000000]);

  const { backgroundImage, highlightImage } = useStaticQuery(graphql`
    query {
      backgroundImage: file(relativePath: { eq: "cartographer.png" }) {
        childImageSharp {
          fixed(width: 500, height: 499, background: "transparent") {
            src
          }
        }
      }
      highlightImage: file(relativePath: { eq: "cartographer-highlight.png" }) {
        childImageSharp {
          fixed(width: 500, height: 499, background: "transparent") {
            src
          }
        }
      }
    }
  `);

  useEffect(() => {
    (async () => {
      setImage(await addImage(highlightImage.childImageSharp.fixed.src));
    })();
  }, []);

  useEffect(() => {
    const updateLoc = (e) => setMouseLoc([e.clientX, e.clientY]);
    const redraw = () => draw(canvasRef.current, highlight, mouseX, mouseY);
    document.addEventListener("mousemove", updateLoc);
    window.addEventListener("resize", redraw);
    return () => {
      document.removeEventListener("mousemove", updateLoc);
      window.removeEventListener("resize", redraw);
    };
  });

  useEffect(() => {
    if (!canvasRef?.current || !highlight) return;
    draw(canvasRef.current, highlight, mouseX, mouseY);
  }, [canvasRef, highlight, mouseX, mouseY]);

  return useMemo(
    () => (
      <div className="flex flex-col min-h-screen font-sans text-white bg-gradient-to-b from-black to-yellow-700">
        <canvas
          ref={canvasRef}
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: "block",
            backgroundImage:`url(${backgroundImage.childImageSharp.fixed.src})`,
            backdropFilter: "contrast(1.4) brightness(1.0)"
          }}
        />
        <div
          style={{
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            flex: 1,
            overflowX: "hidden",
          }}
        >
          <Header />
          <main className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    ),
    [children]
  );
};

export default Layout;
