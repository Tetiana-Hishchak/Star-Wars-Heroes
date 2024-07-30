// import { Link } from 'react-router-dom';
// import { BuyButtonCart } from '../BuyButtonCard/BuyButtonCart';
// import { FavouritesIcon } from '../FavouritesIcon/FavouritesIcon';
import './PersonCard.scss';
import { Hero } from '../../type/Hero';
import { PersonImage } from '../PersonImage/PersonImage';

type Props = {
  person: Hero;
};

export const PersonCard: React.FC<Props> = ({ person }) => {
  const {
    name, id,
  } = person;

  return (
    <div
      className="PersonCard"
    >
      <div className="PersonCard__photo">
        <PersonImage
          id={id}  
          name= {name}
        />
      </div>
      <div className="PersonCard__title">{name}</div>
    </div>
  );
};
