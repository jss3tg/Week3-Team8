import React from "react";
import "./Home.css";

function Home() {
  // const FontLink = () => {
  //   return(
  //       <div className="card">
  //           <span className="font-link">
  //             <img
  //             src= "https://upload.wikimedia.org/wikipedia/en/d/d1/Virginia_Cavaliers_sabre.svg"
  //             alt="uva logo"
  //             />
  //               HOOS SELLING
  //           </span>
  //       </div>
  //   )
  // };
  
  return (
    <div className="Home">
      <div className="lander">
              <img
              src= "https://upload.wikimedia.org/wikipedia/en/d/d1/Virginia_Cavaliers_sabre.svg"
              alt="uva logo"
              width="300px"
              height ="300px"
              />
           <p className = "hoos-title">HOOS SELLING</p>
        <h5 className="text-muted">Buy and sell used appliances, furniture, and study tools!</h5>
        <h6 className="more-text">Click on Products to view current items!</h6>
      </div>
    </div>
  );
}

export default Home;