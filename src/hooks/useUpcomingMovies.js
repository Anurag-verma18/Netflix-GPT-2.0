import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { MOVIE_API_OPTIONS } from "../utils/constants";


const useUpcomingMovies = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        const getUpcomingMovies = async () => {
            const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', MOVIE_API_OPTIONS);
            const json = await data.json();
            dispatch(addUpcomingMovies(json.results));
        };
        getUpcomingMovies();
    }, [dispatch]);
};

export default useUpcomingMovies;