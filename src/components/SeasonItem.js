import { useSelector } from "react-redux";
import EpisodeList from "./EpisodeList";


const SeasonItem = ({ seasonData }) => {

  const episodesData = useSelector((store) => store?.shows?.singleShow?._embedded?.episodes);
  //console.log(episodesData);
  return (
    <section className="text-left">
      <h3 className="text-sm text-gray-300">{seasonData?.episodeOrder} Episodes</h3>
      {episodesData && (
        <EpisodeList seasonNum={seasonData?.number} episodesData={episodesData} />
      )}
    </section>
  )
}

export default SeasonItem;