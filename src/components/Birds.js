const Birds = ({birdsArray}) => {
    return (
        <>
        {birdsArray.map((bird) => {
          return (
            <div className="birdCard" key={bird.id}>
              <img className="birdImage" src={bird.src.portrait} />
              <p className="birdTitle">{bird.v}</p>

            </div>
          );
        })}
        
      </>
    )
}

export default Birds