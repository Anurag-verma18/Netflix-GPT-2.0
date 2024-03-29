import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { MOVIE_API_OPTIONS } from "../utils/constants";


const useTopRatedMovies = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        const getTopRatedMovies = async () => {
            const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', MOVIE_API_OPTIONS);
            const json = await data.json();
            dispatch(addTopRatedMovies(json.results));
        };
        getTopRatedMovies();
    }, [dispatch]);
};

export default useTopRatedMovies;