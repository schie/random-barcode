import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import JsBarcode from 'jsbarcode';
import './App.css';

const getRandomBarcode = () => Math.random().toString().substring(2, 14);

const sample = <T,>(arr: T[]): T => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

const parseBarcodesParam = (param: string | null) => {
  if (!param) return [];
  const barcodes = param.split(',').map((barcode) => barcode.trim());
  return barcodes.filter(Boolean);
};

const clearBarcodesParam = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  params.delete('barcodes');
  window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  window.location.reload();
};

/**
 * The `App` component renders a random barcode that updates periodically.
 *
 * ### Query Parameters
 * - `barcodes`: A comma-separated list of barcode values to be used for generating random barcodes.
 *   - Example: `?barcodes=12345,67890,ABCDE`
 *   - If the `barcodes` parameter is provided, the app will randomly select barcodes from the provided list.
 *   - If the `barcodes` parameter is not provided, the app will generate completely random barcodes.
 *
 * ### Usage
 * - Click on the barcode to toggle between pausing and resuming the barcode updates.
 * - The app will display a message indicating whether the updates are paused or running.
 */
function App() {
  const [enabled, setEnabled] = useState(true);

  const containerRef = useRef<SVGSVGElement>(null);

  const search = window.location.search;

  const barcodes = useMemo(() => {
    const params = new URLSearchParams(search);
    const barcodesParam = params.get('barcodes');
    return parseBarcodesParam(barcodesParam);
  }, [search]);

  const setNewBarcode = useCallback(() => {
    const randomBarcode = barcodes.length > 0 ? sample(barcodes) : getRandomBarcode();
    JsBarcode(containerRef.current!, randomBarcode, {
      width: 5,
      height: 300,
      margin: 10,
    });
  }, [barcodes]);

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
  }, []);

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
      <hr />
      <p className="read-the-docs">
        Use the <code>barcodes</code> query parameter to provide a custom list of barcodes.
        <br />
        For example: <code>?barcodes=12345,67890,ABCDE</code>.
        <br />
        The app will randomly select barcodes from this list.
      </p>
      {barcodes.length > 0 && (
        <button onClick={clearBarcodesParam}>Remove Barcodes Query Param</button>
      )}
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
