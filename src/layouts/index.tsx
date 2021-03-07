import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { getImage, StaticImage } from "gatsby-plugin-image";

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

const draw = (canvas: HTMLCanvasElement, highlight, background, x, y) => {
  const ctx = canvas.getContext("2d");
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  ctx.clearRect(0, 0, width, height);

  for (let x = 0; x < width; x += 500) {
    for (let y = 0; y < height; y += 499) {
      ctx.drawImage(highlight, x, y);
    }
  }

  ctx.globalCompositeOperation = "source-in";
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, 300);
  gradient.addColorStop(0, "#b45309");
  gradient.addColorStop(1, "transparent");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  ctx.globalCompositeOperation = "destination-over";
  ctx.filter = "contrast(2) brightness(1.6)";

  for (let x = 0; x < width; x += 500) {
    for (let y = 0; y < height; y += 499) {
      ctx.drawImage(background, x, y);
    }
  }
};

const Layout: FC = ({ children }) => {
  const canvasRef = useRef();
  const [highlight, setImage] = useState<HTMLImageElement>();
  const [background, setBackground] = useState<HTMLImageElement>();
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
      setBackground(await addImage(backgroundImage.childImageSharp.fixed.src));
    })();
  }, []);

  useEffect(() => {
    const updateLoc = (e) => setMouseLoc([e.clientX, e.clientY]);
    const redraw = () =>
      draw(canvasRef.current, highlight, background, mouseX, mouseY);
    document.addEventListener("mousemove", updateLoc);
    window.addEventListener("resize", redraw);
    return () => {
      document.removeEventListener("mousemove", updateLoc);
      window.removeEventListener("resize", redraw);
    };
  });

  useEffect(() => {
    if (!canvasRef?.current || !highlight || !background) return;
    draw(canvasRef.current, highlight, background, mouseX, mouseY);
  }, [canvasRef, highlight, background, mouseX, mouseY]);

  return useMemo(
    () => (
      <div className="flex flex-col min-h-screen font-sans text-white bg-gradient-to-b from-black to-yellow-700">
        <canvas
          ref={canvasRef}
          style={{
            position: "fixed",
            height: "100vh",
            width: "100vw",
            display: "block",
          }}
        />
        <div
          style={{
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            flex: 1,
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
