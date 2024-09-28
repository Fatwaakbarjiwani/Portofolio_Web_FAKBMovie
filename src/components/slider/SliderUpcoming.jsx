import { useEffect, useState, useRef } from "react";
import { BiCalendarEvent } from "react-icons/bi";
import { CiStar } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  getActorMovies,
  getUpcomingMovies,
  getVideoMovies,
} from "../../redux/actions/movieAction";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { setIdMovie, setVideoMovie } from "../../redux/reducers/movieReducer";

export default function SliderUpcoming() {
  const imageUrlUHD = import.meta.env.VITE_REACT_WORIIMAGE;
  const W780IMAGE = import.meta.env.VITE_REACT_W780IMAGE;
  const { actorMovie, upcomingMovie, genreMovie, videoMovie, idMovie } =
    useSelector((state) => state.movie);
  const [actorIndex, setActorIndex] = useState(0);
  const dispatch = useDispatch();

  const swiperRef = useRef(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  useEffect(() => {
    dispatch(getUpcomingMovies());
  }, [dispatch]);

  useEffect(() => {
    if (actorIndex >= 0) {
      dispatch(getActorMovies(upcomingMovie[actorIndex || 0]?.id));
    }
    if (idMovie) {
      dispatch(getVideoMovies(idMovie));
    }
  }, [dispatch, actorIndex, idMovie, upcomingMovie]);

  return (
    <>
      <div className="flex gap-3 items-start px-4 sm:px-10">
        <h1 className="text-fourth text-2xl sm:text-4xl font-bold font-lato drop-shadow-text-bottom-hover z-20 mb-4">
          Trailer Movie
        </h1>
        <button
          className="text-second bg-fourth p-1 sm:p-2 rounded-full hover:scale-110 duration-200"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <BsArrowLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
        <button
          className="text-second bg-fourth p-1 sm:p-2 rounded-full hover:scale-105 duration-200"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <BsArrowRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </div>

      <div className="relative">
        <Swiper
          slidesPerView={1}
          onSlideChange={(swiper) => {
            setActorIndex(swiper.realIndex);
          }}
          allowTouchMove={false}
          modules={[Navigation]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {upcomingMovie.map((item) => (
            <SwiperSlide key={item?.id} className="relative pb-4">
              <div className="relative h-auto sm:h-[80vh] flex flex-col sm:flex-row items-center justify-between">
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    backgroundImage: `url(${imageUrlUHD}${item?.backdrop_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent"></div>
                </div>

                <div className="relative z-10 p-4 sm:pl-10 mt-2 w-full sm:w-5/12 h-full flex items-center">
                  {idMovie === item?.id ? (
                    <div className="w-full aspect-video">
                      <iframe
                        className="w-full h-full rounded-lg"
                        src={`https://www.youtube.com/embed/${videoMovie[0]?.key}`}
                        title="YouTube video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src={`${W780IMAGE}${item?.backdrop_path}`}
                        className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
                        alt="Movie backdrop"
                      />
                      <div
                        onClick={() => {
                          dispatch(setIdMovie(item?.id));
                          dispatch(setVideoMovie([]));
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="bg-black bg-opacity-50 rounded-full p-4 hover:bg-opacity-70 transition-opacity duration-300">
                          <FaPlay className="text-white text-4xl" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative h-full px-4 sm:px-10 w-full sm:w-7/12 space-y-2">
                  <h1 className="font-lato font-[600] text-second/90 text-2xl sm:text-4xl leading-7 sm:leading-9 mt-2">
                    {item?.title}
                  </h1>
                  <p className="text-second/90 text-sm sm:text-lg font-lato leading-5 sm:leading-6">
                    {item?.overview}
                  </p>

                  <div className="flex flex-wrap space-x-2">
                    {item?.genre_ids.map((genreId) =>
                      genreMovie
                        .filter((genre) => genre.id === genreId)
                        .map((matchedGenre) => (
                          <div
                            className="font-mono text-sm sm:text-lg text-second backdrop-blur-lg border bg-fourth/30 border-fourth px-2 rounded-full mt-1"
                            key={matchedGenre.id}
                          >
                            <p>{matchedGenre.name}</p>
                          </div>
                        ))
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-5 mt-2 sm:mt-4">
                    <div className="flex items-center gap-1">
                      <BiCalendarEvent className="text-lg sm:text-xl bg-fourth rounded-full text-white w-6 sm:w-8 h-6 sm:h-8 p-1" />
                      <p className="text-white font-semibold text-sm sm:text-xl">
                        {formatDate(item?.release_date)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <CiStar className="text-lg sm:text-xl bg-fourth rounded-full text-white w-6 sm:w-8 h-6 sm:h-8 p-1" />
                      <p className="text-white font-semibold font-lato text-sm sm:text-xl">
                        {item?.vote_average.toFixed(1)} | {item?.popularity}
                      </p>
                    </div>
                  </div>

                  {/* Actors */}
                  <div className="mt-4 sm:mt-6">
                    <Swiper
                      slidesPerView={2}
                      spaceBetween={4}
                      freeMode={true}
                      grabCursor={true}
                      modules={[FreeMode]}
                      breakpoints={{
                        640: {
                          slidesPerView: 4,
                        },
                      }}
                    >
                      {actorMovie.map((actor) => (
                        <SwiperSlide key={actor.id}>
                          <div className="flex flex-col items-center space-y-1 sm:space-y-2">
                            <img
                              src={
                                actor.profile_path
                                  ? `${imageUrlUHD}${actor.profile_path}`
                                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb51ZwKCKqU4ZrB9cfaUNclbeRiC-V-KZsfQ&s"
                              }
                              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-fourth"
                              alt={actor.name}
                            />
                            <div className="text-center">
                              <p className="text-white text-xs sm:text-sm font-semibold">
                                {actor.name}
                              </p>
                              <p className="text-gray-400 text-xs sm:text-sm">
                                as {actor.character}
                              </p>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
