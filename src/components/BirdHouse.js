import Birds from './Birds'

const BirdHouse = ({ birdsArray, getLikes }) => {

  

  return (
    <div className="birdhouseContainer">
      <Birds 
      
      birdsArray={birdsArray}
      getLikes={getLikes}
      
      />
    </div>
  );
};

export default BirdHouse;
