import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGenreMovies,
  getPopularMovies,
  getTopRatedMovies,
} from "../../redux/actions/movieAction";
import { BiArrowToRight, BiCalendarEvent, BiPlay } from "react-icons/bi";
import { CiStar } from "react-icons/ci";
import SliderPopular from "../../components/slider/SliderPopular";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode, Pagination } from "swiper/modules";
import { Tilt } from "react-tilt";
import SliderUpcoming from "../../components/slider/SliderUpcoming";
import { setIdMovie, setOpen } from "../../redux/reducers/movieReducer";
import { useNavigate } from "react-router-dom";

const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 35, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};

function HomePage() {
  const imageUrlUHD = import.meta.env.VITE_REACT_WORIIMAGE;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { popularMovie } = useSelector((state) => state.movie);
  const { topRatedMovie } = useSelector((state) => state.movie);
  const { genreMovie } = useSelector((state) => state.movie);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    dispatch(getPopularMovies());
    dispatch(getTopRatedMovies());
    dispatch(getGenreMovies());
  }, [dispatch, activeIndex]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="bg-primary">
      <div
        className="relative flex items-center"
        key={popularMovie[0]?.id}
        style={{
          backgroundImage: `url(${imageUrlUHD}${popularMovie[activeIndex]?.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "105vh",
        }}
      >
        <div className="absolute bottom-0 bg-gradient-to-t from-primary via-primary/50 to-transparent h-40 w-full"></div>
        <div className="flex items-center w-full p-10 h-full bg-primary/50">
          <div className="flex items-center justify-between w-full">
            {/* Informasi Film */}
            <div className="w-5/12 space-y-3 z-20 relative">
              <h1 className="font-lato font-[600] text-second/90 text-[55px] leading-[10vh]">
                {popularMovie[activeIndex]?.original_title}
              </h1>
              <div className="flex space-x-2">
                {popularMovie[activeIndex]?.genre_ids.map((genreId) =>
                  genreMovie
                    .filter((genre) => genre.id === genreId)
                    .map((matchedGenre) => (
                      <div
                        className="font-mono text-lg text-second backdrop-blur-lg border bg-fourth/30 border-fourth px-2 rounded-full"
                        key={matchedGenre.id}
                      >
                        <p>{matchedGenre.name}</p>
                      </div>
                    ))
                )}
              </div>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-1">
                  <BiCalendarEvent className="text-xl bg-fourth rounded-full text-second/90 w-8 h-8 p-1" />
                  <p className="text-white font-semibold text-xl">
                    {formatDate(popularMovie[activeIndex]?.release_date)}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <CiStar className="text-xl bg-fourth rounded-full text-second/90 w-8 h-8 p-1" />
                  <p className="text-white font-semibold font-lato text-xl">
                    {popularMovie[activeIndex]?.vote_average.toFixed(1)} |{" "}
                    {popularMovie[activeIndex]?.popularity}
                  </p>
                </div>
              </div>
              <p className="text-second/80 text-lg font-lato leading-6">
                {popularMovie[activeIndex]?.overview}
              </p>
              <button
                onClick={() => {
                  dispatch(setOpen(true));
                  dispatch(setIdMovie(popularMovie[activeIndex]?.id));
                }}
                className="mt-8 flex items-center bg-fourth rounded-full p-1 px-3 text-xl font-bold font-mono text-second hover:bg-gradient-to-l from-fourth to-white/50 transition-colors ease-in-out duration-300"
              >
                <BiPlay className="text-2xl text-second" /> Lihat Trailler
              </button>
            </div>

            {/* Slider */}
            <div className="w-6/12 h-screen flex items-end pb-4">
              <SliderPopular
                setActiveIndex={setActiveIndex}
                activeIndex={activeIndex}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="p-10">
        <h1 className="text-fourth text-4xl font-bold font-lato drop-shadow-text-bottom-hover">
          Trending Movie
        </h1>
        <Swiper
          slidesPerView={6}
          spaceBetween={12}
          grabCursor={true}
          pagination={true}
          freeMode={true}
          modules={[Pagination, FreeMode]}
          className="py-4 z-10 rounded-xl h-[50vh]"
        >
          {topRatedMovie.map((item) => (
            <SwiperSlide key={item.id}>
              <Tilt options={defaultOptions} className="h-full">
                <div onClick={()=>navigate(`/detailMovie/${item?.id}`)} className="relative h-full overflow-hidden rounded-xl border border-transparent hover:border-fourth hover:shadow-card-3d-hover duration-200">
                  <img
                    className="z-0 h-full object-cover object-center w-full rounded-xl"
                    src={`${imageUrlUHD}${item?.poster_path}`}
                    alt=""
                  />
                  <div className="z-0 bg-gradient-to-t from-primary via-primary/60 to-transparent h-20 absolute bottom-0 w-full"></div>
                </div>
              </Tilt>
            </SwiperSlide>
          ))}
          <SwiperSlide className="flex h-full items-center">
            <button onClick={()=>navigate(`/allMovie`)} className="font-mono text-second gap-2 flex items-center p-2 font-bold text-2xl">
              Selengkapnya
              <BiArrowToRight className="text-2xl" />
            </button>
          </SwiperSlide>
        </Swiper>
      </div>
      <SliderUpcoming />
    </div>
  );
}

export default HomePage;
