import {useState} from 'react'

const Birds = ({birdsArray}) => {

  const [enlarge, setEnlarge] = useState(false)
  const handleEnlarge = () => {
    setEnlarge(!enlarge)
  }



    return (
        <>
        {birdsArray.map((bird) => {
          return (
            <div 
            // className="birdCard opacity" 
            className={enlarge ? 
              "birdCard enlarger opacity" : 
              "birdCard opacity"}
            onClick={handleEnlarge}
            key={bird.id}>
              <img className="birdImage" 
              src={bird.src.portrait} 
              alt={bird.alt}
              />
              <p className="birdTitle">{bird.v.comName}</p>
              <p>{bird.v.locName}</p>
              <p>{bird.v.sciName}</p>
            </div>
          );
        })}
        
      </>
    )
}

export default Birds