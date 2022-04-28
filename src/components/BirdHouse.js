const BirdHouse = ({birdsArray}) => {
    return (
        <div className="birdhouseContainer">
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