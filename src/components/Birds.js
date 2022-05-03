import { useState } from "react";
import pin from "../assets/pin.svg";


const Birds = ({ birdsArray }) => {
  const [clicked, setClicked] = useState();

  const handleIndex = (index) => {
    setClicked(index);
  };

  // where do i get the info from, and when do i use it/render it
  return (
    <>
      {birdsArray.map((bird, index) => {
        return (
          <div
            // in react you have the possibility to toggle
            className={index === clicked ? "birdCard position" : "birdCard"}
            onClick={() => {
              handleIndex(index);}
            }

            key={index}
          >
            {/* ternary to check if any content exists */}
            {bird ? (
              <>
                <img
                  className="birdImage"
                  src={bird.src.portrait}
                  alt={bird.alt}
                />

                <p className="birdTitle">{bird.v.comName}</p>
                <div className="subTitle">
                  <a 
                  target="_blank"
                  className="birdLocation"
                  href={`https://www.google.com/maps/search/?api=1&query=${bird.v.lat}%2C${bird.v.lng}`}>{bird.v.locName}
                  <img
                  className="pin"
                  src={pin}
                  alt="Location pin icon"
                  /></a>
                  
                  <p className="birdSci">{bird.v.sciName}</p>
                </div>
              </>
            ) : null}
          </div>
        );
      })}
    </>
  );
};

export default Birds;
