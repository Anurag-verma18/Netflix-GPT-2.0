import { useState } from "react"
import ShowsCard from "./ShowsCard";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";


const ShowsList = ({showsData, showsTitle}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const showsPerPage = 40;
    const indexOfLastShow = currentPage * showsPerPage;
    const indexOfFirstShow = indexOfLastShow - showsPerPage;
    const currentShows = showsData.slice(indexOfFirstShow, indexOfLastShow);
    const totalPages = Math.ceil(showsData.length / showsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      };
    
      const handlePrevPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };
    
      const handleNumberPage = (pageNum) => {
        if (pageNum) {
          setCurrentPage(pageNum);
        }
      };

  return (
    <section className="px-4 pb-10">
        <h1 className="text-white mb-2 px-3">{showsTitle}</h1>
        <div className="max-w-[1300px] my-0 mx-auto"> 
            <div className="shows-list grid grid-cols-7 gap-x-2 gap-y-6">
                {currentShows?.map((show) => (
                    <ShowsCard key={show.id} itemData={show} itemType="ALL_SHOWS"/>
                ))}
            </div>
            <div className="mt-10 flex items-center justify-center text-white">
                <button className={`w-12 h-12 ${ currentPage === 1 ? "opacity-50 cursor-default" : "" } bg-[#141414] border-[1px] border-[#262626] rounded-sm text-lg inline-flex justify-center items-center`}
                    disabled={currentPage === 1}
                    onClick={handlePrevPage}
                >
                    <MdOutlineKeyboardDoubleArrowLeft />
                </button>
                <ul className="flex">
                    {Array.from({ length: totalPages }, (_, index) => {
                        const tempPageNo = index + 1;
                        return (
                          <li key={index}>
                            <button
                              type="button"
                              onClick={() => handleNumberPage(tempPageNo)}
                              className={`w-12 h-12 text-lg font-medium ${tempPageNo === currentPage ? "active bg-[#b30000] border-[1px] border-[#b30000]" : ""} hover:bg-[#141414] border-[1px] border-[#262626] rounded-sm`}
                            >
                              {tempPageNo}
                            </button>
                          </li>
                        );
                    })}
                </ul>
                <button className={`w-12 h-12 ${ currentPage === totalPages ? "opacity-50 cursor-default" : "" } bg-[#141414] border-[1px] border-[#262626] rounded-sm text-lg inline-flex justify-center items-center`}
                    disabled={currentPage === totalPages}
                    onClick={handleNextPage}
                >
                    <MdOutlineKeyboardDoubleArrowRight />
                </button>
            </div>
        </div>
    </section>
  )
}

export default ShowsList