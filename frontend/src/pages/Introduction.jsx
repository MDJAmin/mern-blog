import React, { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import { ClipLoader } from "react-spinners";

export default function Introduction() {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className="model">
      {loading && (
        <div className="spinner-container-2">
          <ClipLoader color="#ffffff" loading={loading} size={150} />
        </div>
      )}
      <Spline 
        scene="https://prod.spline.design/DUDjn8tpigJhrJtK/scene.splinecode" 
        onLoad={handleLoad}
        style={{ display: loading ? "none" : "block" }} 
      />
    </div>
  );
}
