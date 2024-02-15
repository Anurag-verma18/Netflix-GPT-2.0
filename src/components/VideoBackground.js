import { useEffect } from "react";
import { MOVIE_API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";


const VideoBackground = ({movieId}) => {
    const dispatch = useDispatch();
    const trailerVideo = useSelector((store) => store?.movies?.trailerVideo);

    const getMovieVideos = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/955916/videos?language=en-US', MOVIE_API_OPTIONS);
        const json = await data.json();
        console.log(json);
        const filterData = json.results.filter((video) => video.name === "Official Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];
        console.log(trailer);
        dispatch(addTrailerVideo(trailer));
    };
    
    useEffect(() => {
        getMovieVideos();
    }, []);

    return (
        <div>
            <iframe
            width="560" 
            height="315" 
            src={"https://www.youtube.com/embed/" + trailerVideo?.key}
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
        </div>
    );
};

export default VideoBackground;