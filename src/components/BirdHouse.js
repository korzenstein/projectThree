import Birds from './Birds'

const BirdHouse = ({ birdsArray, toggle }) => {
  return (
    <div className="birdhouseContainer">
      <Birds 
      birdsArray={birdsArray}
      />
    </div>
  );
};

export default BirdHouse;
