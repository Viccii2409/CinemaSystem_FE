import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

const BarcodeGenerator = ({ code }) => {
    const barcodeRef = useRef(null);
  
    useEffect(() => {
      if (barcodeRef.current) {
        JsBarcode(barcodeRef.current, code, {
          format: "CODE128",
          lineColor: "#000",
          width: 2,
          height: 100,
          displayValue: true,
        });
      }
    }, [code]);
  
    return (
      <div style={{ textAlign: "center" }}>
        <svg ref={barcodeRef}></svg>
      </div>
    );
  };
  export default BarcodeGenerator;