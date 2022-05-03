import Birds from './Birds'

const BirdHouse = ({ birdsArray }) => {

  

  return (
    <div className="birdhouseContainer">
      <Birds 
      birdsArray={birdsArray}      
      />
    </div>
  );
};

export default BirdHouse;
