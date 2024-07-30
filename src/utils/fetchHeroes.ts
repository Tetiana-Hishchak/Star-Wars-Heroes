import axios from "axios";
import { Hero } from "../type/Hero";


export const fetchHeroes = async (page: number, setLoading: (loading: boolean) => void, setHeroes: (heroes: Hero[]) => void) => {
  setLoading(true);
  try {
    const response = await axios.get<{ results: Hero[] }>(`https://sw-api.starnavi.io/people/?page=${page}`);
    setHeroes(response.data.results);
  } catch (error) {
    console.error('Failed to fetch heroes:', error);
  } finally {
    setLoading(false);
  }
};