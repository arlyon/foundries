import React, { CSSProperties, FC, useEffect, useMemo, useRef, useState } from "react";
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

const draw = (ctx: CanvasRenderingContext2D, highlight, x, y) => {
  const nearestX = Math.round(x / 500) * 500;
  const nearestY = Math.round(y / 499) * 499;
  const minX = nearestX - 500;
  const minY = nearestY - 500;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.globalCompositeOperation = "source-over";
  ctx.drawImage(highlight, nearestX, nearestY);
  ctx.drawImage(highlight, minX, nearestY);
  ctx.drawImage(highlight, nearestX, minY);
  ctx.drawImage(highlight, minX, minY);

  const gradient = ctx.createRadialGradient(x, y, 0, x, y, 300);
  gradient.addColorStop(0, "#b45309");
  gradient.addColorStop(1, "transparent");

  ctx.globalCompositeOperation = "source-in";
  ctx.fillStyle = gradient;
  ctx.fillRect(minX, minY, 1000, 998);
};

const Layout: FC = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const [highlight, setImage] = useState<HTMLImageElement | null>(null);
  const [mouse, setMouse] = useState({x:100_000, y: 100_000});

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

  const context = useMemo(() => canvasRef.current?.getContext("2d"), [canvasRef.current]);

  useEffect(() => {
    const resize = () => {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      if (highlight === null) return;
      draw(context, highlight, mouse.x, mouse.y);
    };

    const initImage = async () => setImage(await addImage(highlightImage.childImageSharp.fixed.src));

    const updateLoc = (e) => setMouse({x: e.clientX, y: e.clientY});

    resize();
    initImage();

    document.addEventListener("mousemove", updateLoc);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("mousemove", updateLoc);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    if (!highlight) return;
    draw(context, highlight, mouse.x, mouse.y);
  }, [context, highlight, mouse]);

  const fullScreen: CSSProperties = {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "block",
  };

  return useMemo(
    () => (
      <div className="flex flex-col min-h-screen font-sans text-white bg-gradient-to-b from-black to-yellow-700">
        <div
          style={{
            ...fullScreen,
            backgroundImage: `url(${backgroundImage.childImageSharp.fixed.src})`,
            filter: "contrast(2) brightness(1.6)",
          }}
        />
        <canvas ref={canvasRef} style={fullScreen} />
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
          <main className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">{children}</main>
          <Footer />
        </div>
      </div>
    ),
    [children]
  );
};

export default Layout;
