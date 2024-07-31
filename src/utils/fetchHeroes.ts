import axios from 'axios';
import { Hero } from '../type/Hero';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchHeroes = async (
  page: number,
  setLoading: (loading: boolean) => void,
  setHeroes: (heroes: Hero[]) => void,
  setTotalCount: (count: number) => void
) => {
  try {
    setLoading(true);
    const response = await axios.get(`${API_BASE_URL}/people/?page=${page}`);
    setHeroes(response.data.results);
    setTotalCount(response.data.count); 
  } catch (error) {
    console.error('Error fetching heroes:', error);
  } finally {
    setLoading(false);
  }
};
