const BirdHouse = ({birdsArray}) => {
    return (
        <div className="birdhouseContainer">
            <h4>Future Bird House Collection</h4>
            {
                birdsArray.map(bird => {
                    return (
                        <div className="birdCard">
                            <p>{bird.comName}</p>
                            <p>{bird.howMany}</p>
                            <p>{bird.sciName}</p>
                            <p>{bird.locName}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default BirdHouse