import React from "react";
import "./Home.css";

function Home() {
  const FontLink = () => {
    return(
        <div className="card">
            <span className="font-link">
                HOOS SELLING
            </span>
        </div>
    )
  };
  
  return (
    <div className="Home">
      <div className="lander">
        <FontLink />
        <p className="text-muted">What do you want to sell?</p>
      </div>
    </div>
  );
}

export default Home;