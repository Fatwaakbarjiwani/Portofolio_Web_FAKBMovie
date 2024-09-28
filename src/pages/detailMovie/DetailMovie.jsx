import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getActorMovies,
  getDetailMovies,
  getGenreMovies,
  getVideoMovies,
} from "../../redux/actions/movieAction";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { CiStar } from "react-icons/ci";
import { BiCalendarEvent, BiPlay } from "react-icons/bi";
import { setIdMovie, setOpen } from "../../redux/reducers/movieReducer";

export default function DetailMovie() {
  const imageUrlUHD = import.meta.env.VITE_REACT_WORIIMAGE;
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detailMovie, actorMovie } = useSelector(
    (state) => state.movie
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  useEffect(() => {
    window.scroll(top)
    dispatch(getDetailMovies(id));
    dispatch(getGenreMovies());
    dispatch(getActorMovies(id));
    dispatch(getVideoMovies(id));
  }, [dispatch, id]);

  return (
    <div className="bg-primary min-h-screen">
      {/* Background image and main info */}
      <div
        style={{
          backgroundImage: `url(${imageUrlUHD}${detailMovie?.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
      >
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center w-full h-full bg-primary/90 p-6">
          {/* Poster Image */}
          <div className="w-40 md:w-1/4 lg:w-1/6">
            <img
              src={`${imageUrlUHD}${detailMovie?.poster_path}`}
              className="rounded-2xl shadow-lg"
              alt={detailMovie?.title}
            />
            <button
              onClick={() => {
                dispatch(setOpen(true));
                dispatch(setIdMovie(detailMovie?.id));
              }}
              className="mt-8 flex items-center bg-fourth rounded-full p-1 px-3 text-xl font-bold font-mono text-second hover:bg-gradient-to-l from-fourth to-white/50 transition-colors ease-in-out duration-300"
            >
              <BiPlay className="text-2xl text-second" /> Lihat Trailler
            </button>
          </div>

          {/* Movie Information */}
          <div className="flex flex-col px-6 w-full md:w-2/3 lg:w-7/12 space-y-4">
            <h1 className="font-lato font-semibold text-second text-3xl md:text-4xl lg:text-5xl leading-snug mt-2">
              {detailMovie?.title}
            </h1>
            {detailMovie?.tagline && (
              <p className="italic text-second/70 text-lg lg:text-xl">
                {`"${detailMovie?.tagline}"`}
              </p>
            )}
            <p className="text-second/90 text-sm md:text-base lg:text-lg font-lato leading-relaxed">
              {detailMovie?.overview}
            </p>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {detailMovie?.genres?.map((genre) => (
                <div
                  className="font-mono text-sm md:text-lg text-second backdrop-blur-lg border bg-fourth/30 border-fourth px-2 py-1 rounded-full"
                  key={genre.id}
                >
                  <p>{genre.name}</p>
                </div>
              ))}
            </div>

            {/* Movie Details */}
            <div className="flex flex-wrap items-center gap-6">
              {/* Release Date */}
              <div className="flex items-center gap-2">
                <BiCalendarEvent className="text-2xl bg-fourth rounded-full text-white w-8 h-8 p-1" />
                <p className="text-white font-semibold text-base md:text-xl">
                  {formatDate(detailMovie?.release_date)}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <CiStar className="text-2xl bg-fourth rounded-full text-white w-8 h-8 p-1" />
                <p className="text-white font-semibold font-lato text-base md:text-xl">
                  {detailMovie?.vote_average?.toFixed(1)} |{" "}
                  {detailMovie?.vote_count} votes
                </p>
              </div>
            </div>
            <div className="flex gap-8">
              {/* Runtime */}
              {detailMovie?.runtime && (
                <div className="flex items-center gap-2">
                  <p className="text-white font-semibold text-base md:text-xl">
                    <span className="text-fourth font-bold drop-shadow-text-bottom-hover">
                      Runtime :{" "}
                    </span>
                    {detailMovie.runtime} min
                  </p>
                </div>
              )}

              {/* Spoken Languages */}
              {detailMovie?.spoken_languages &&
                detailMovie.spoken_languages.length > 0 && (
                  <div className="flex items-center gap-2">
                    <p className="text-white font-semibold text-base md:text-xl">
                      <span className="text-fourth font-bold drop-shadow-text-bottom-hover">
                        Language :{" "}
                      </span>
                      {detailMovie.spoken_languages
                        .map((lang) => lang.name)
                        .join(", ")}
                    </p>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>

      {/* Actors Section */}
      <div className="bg-primary py-8 px-10">
        <h2 className="text-fourth drop-shadow-text-bottom-hover text-3xl font-[900] mb-6 font-Madimi">
          CAST
        </h2>
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          freeMode={true}
          grabCursor={true}
          modules={[FreeMode]}
        >
          {actorMovie.map((actor) => (
            <SwiperSlide key={actor.id}>
              <div className="flex flex-col items-center space-y-2">
                <img
                  src={
                    actor.profile_path
                      ? `${imageUrlUHD}${actor.profile_path}`
                      : "https://via.placeholder.com/150"
                  }
                  className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full object-cover border-2 border-fourth shadow-lg"
                  alt={actor.name}
                />
                <div className="text-center">
                  <p className="text-white font-semibold text-sm md:text-base">
                    {actor.name}
                  </p>
                  <p className="text-gray-400 text-xs md:text-sm">
                    as {actor.character}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
