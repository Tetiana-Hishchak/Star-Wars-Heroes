import React from 'react';
import './PersonImage.scss';

type Props = {
  id: number;
  name: string;
};

export const PersonImage: React.FC<Props> = ({ id, name }) => {
  return (
    <img 
      className="Person__img"
      src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} 
      alt={name} 
    />
  );
};