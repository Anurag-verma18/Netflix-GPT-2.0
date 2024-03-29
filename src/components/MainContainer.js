import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { useSelector } from "react-redux";

const MainContainer = () => {

    const movies = useSelector((store) => store?.movies?.nowPlayingMovies);
    
    const mainMovie = movies[16];
    console.log(process.env.REACT_APP_TMDB_KEY);
    const { original_title, overview, id } = mainMovie;

    return (
        <div>
            <VideoTitle title={original_title} overview={overview} />
            <VideoBackground movieId={id}/>
        </div>
    );
};

export default MainContainer;