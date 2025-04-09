import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import JsBarcode from "jsbarcode";
import "./App.css";

const getRandomBarcode = () => Math.random().toString().substring(2, 14);

function App() {
  const [enabled, setEnabled] = useState(true);

  const containerRef = useRef<SVGSVGElement>(null);

  const setNewBarcode = useCallback(() => {
    JsBarcode(containerRef.current!, getRandomBarcode(), {
      width: 5,
      height: 300,
      margin: 10,
    });
  }, []);

  useEffect(() => {
    setNewBarcode();
  }, [setNewBarcode]);

  useEffect(() => {
    if (enabled) {
      setNewBarcode();
      const id = setInterval(() => {
        setNewBarcode();
      }, 2000);

      return () => {
        clearInterval(id);
      };
    }
  }, [enabled, setNewBarcode]);

  const toggle = useCallback(() => {
    setEnabled((prev) => !prev);
  }, [setNewBarcode]);

  const docsAddendum = useMemo(
    () => `Click it to ${enabled ? "pause" : "continue"}`,
    [enabled]
  );

  return (
    <>
      <div className="card">
        <svg ref={containerRef} onClick={toggle} />
      </div>
      <p className="read-the-docs">Just a random barcode.</p>
      <p className="read-the-docs">{docsAddendum}</p>
      <p className="footer">
        Made with ❤️ by{" "}
        <a
          className="footer-link"
          href="https://github.com/schie"
          target="_blank"
          rel="noopener noreferrer"
        >
          @schie
        </a>
      </p>
    </>
  );
}

export default App;
