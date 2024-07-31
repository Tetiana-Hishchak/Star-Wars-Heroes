import axios from 'axios';
import { Node, Edge } from 'react-flow-renderer';
import { Hero } from '../type/Hero';
import { Film } from '../type/Film';
import { Starship } from '../type/Starship';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchHeroData = async (heroId: number) => {
  try {
    // Fetch hero details
    const heroResponse = await axios.get<Hero>(`${API_URL}/people/${heroId}`);
    const hero: Hero = heroResponse.data;

    // Fetch films details
    const filmRequests = hero.films.map((url) => axios.get<Film>(url));
    const filmResponses = await Promise.all(filmRequests);
    const films: Film[] = filmResponses.map((response) => response.data);

    // Fetch starships details
    const starshipUrls = films.flatMap((film) => film.starships);
    const starshipRequests = starshipUrls.map((url) => axios.get<Starship>(url));
    const starshipResponses = await Promise.all(starshipRequests);
    const starships: Starship[] = starshipResponses.map((response) => response.data);

    // Create nodes
    const heroNode: Node = {
      id: `${heroId}`,
      type: 'default',
      position: { x: 0, y: 0 },
      data: { label: `${hero.name} (Hero)` },
    };

    const filmNodes: Node[] = films.map((film, index) => ({
      id: `film-${index}`,
      type: 'default',
      position: { x: 150, y: index * 100 },
      data: { label: film.title },
    }));

    const starshipNodes: Node[] = starships.map((starship, index) => ({
      id: `starship-${index}`,
      type: 'default',
      position: { x: 300, y: index * 100 },
      data: { label: starship.name },
    }));

    // Add labels for the lists
    const filmLabelNode: Node = {
      id: 'films-label',
      type: 'default',
      position: { x: 150, y: -50 },
      data: { label: 'Films' },
    };

    const starshipLabelNode: Node = {
      id: 'starships-label',
      type: 'default',
      position: { x: 300, y: -50 },
      data: { label: 'Starships' },
    };

    // Create edges
    const filmEdges: Edge[] = films.map((_, index) => ({
      id: `edge-${heroId}-film-${index}`,
      source: `${heroId}`,
      target: `film-${index}`,
      animated: true,
    }));

    const starshipEdges: Edge[] = films.flatMap((film, filmIndex) =>
      film.starships.map((starshipUrl) => {
        const starship = starships.find((ship) => ship.url === starshipUrl);
        return starship
          ? {
              id: `edge-film-${filmIndex}-starship-${starship.url}`,
              source: `film-${filmIndex}`,
              target: `starship-${starships.findIndex((ship) => ship.url === starshipUrl)}`,
              animated: true,
            }
          : null;
      })
    ).filter(edge => edge !== null) as Edge[]; // Filter out null values and cast to Edge[]

    return {
      nodes: [heroNode, filmLabelNode, starshipLabelNode, ...filmNodes, ...starshipNodes],
      edges: [...filmEdges, ...starshipEdges],
    };
  } catch (error) {
    console.error('Error fetching hero data:', error);
    throw error;
  }
};
