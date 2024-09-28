import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { setDetailMovie } from "../../redux/reducers/movieReducer";

export default function SliderPopular({ activeIndex, setActiveIndex }) {
  const imageUrl = import.meta.env.VITE_REACT_W500IMAGE;
  const { popularMovie } = useSelector((state) => state.movie);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <Swiper
      slidesPerView={5}
      grabCursor={true}
      loop={true}
      spaceBetween={16}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={true}
      onSlideChange={handleSlideChange}
      modules={[Pagination, Autoplay]}
      className="p-4 z-10 rounded-xl"
    >
      {popularMovie.map((movie, index) => (
        <SwiperSlide key={movie?.id}>
          <div
            onClick={() => {
              navigate(`/detailMovie/${movie.id}`);
              dispatch(setDetailMovie([]));
            }}
          >
            <img
              className={`rounded-xl duration-300 ${
                index === activeIndex
                  ? "-translate-y-3 border-2 border-fourth/80 shadow-card"
                  : "border-2 border-primary/80"
              }`}
              src={`${imageUrl}${movie?.poster_path}`}
              alt={movie?.title}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

SliderPopular.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  setActiveIndex: PropTypes.func.isRequired,
};
