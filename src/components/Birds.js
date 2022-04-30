import { useState } from "react";

const Birds = ({ birdsArray }) => {
  const [clicked, setClicked] = useState();

  const handleIndex = (index) => {
    setClicked(index);
  };

  return (
    <>
      {birdsArray.map((bird, index) => {
        return (
          <div
            className={index === clicked ? "birdCard position" : "birdCard"}
            onClick={() => handleIndex(index)}
            key={index}
          >
            <img className="birdImage" src={bird.src.portrait} alt={bird.alt} />

            <p className="birdTitle">{bird.v.comName}</p>
            <div className="subTitle">
              <p className="birdLocation">{bird.v.locName}</p>
              <p className="birdSci">{bird.v.sciName}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Birds;
