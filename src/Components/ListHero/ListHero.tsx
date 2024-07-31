import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Hero } from '../../type/Hero';
import { fetchHeroes } from '../../utils/fetchHeroes';
import { PaginationButton } from '../PaginationButton/PaginationButton';
import { PersonCard } from '../PersonCard/PersonCard';
import HeroGraph from '../HeroGraph/HeroGraph';
import './ListHero.scss';

export const ListHero: React.FC = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0); 
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage]
  = useState(+(searchParams.get('currentPage') || 1));
  const [loading, setLoading] = useState(true);
  const [selectedHeroId, setSelectedHeroId] = useState<number | null>(null);

  const heroesPerPage = 10;
  
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('currentPage', currentPage.toString());
    setSearchParams(params);

    fetchHeroes(currentPage, setLoading, setHeroes, setTotalCount);
  }, [currentPage, searchParams, setSearchParams]);


  const handleHeroClick = (id: number) => {
    setSelectedHeroId(id);
  };

  const handleCloseHeroGraph = () => {
    setSelectedHeroId(null);
  };

  return (
    <div className="container">
      <div className={cn('list', { 'full-width': selectedHeroId !== null })}>
        <h1>Star Wars Heroes</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <ul className='list__hero'>
              {heroes.map((person) => (
                <li 
                  key={person.url} 
                  onClick={() => handleHeroClick(person.id)}
                  className={cn('list__item', {
                    'list__item-active': person.id === selectedHeroId,
                  })}
                >
                  <PersonCard person={person} />
                </li>
              ))}
            </ul>
            <PaginationButton
              total={totalCount} 
              itemOnPage={heroesPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>

      {selectedHeroId !== null && (
        <div className="hero__graph-container">
          <HeroGraph heroId={selectedHeroId} />
          <button className="close__button" onClick={handleCloseHeroGraph}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ListHero;
