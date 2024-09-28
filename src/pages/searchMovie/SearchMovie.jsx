import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getSearchMovies } from "../../redux/actions/movieAction";
import { useDispatch, useSelector } from "react-redux";
import { CiStar } from "react-icons/ci";
import errorPng from "../../assets/error.png";

export default function SearchMovie() {
  const imageUrlUHD = import.meta.env.VITE_REACT_WORIIMAGE;
  const { searchMovie } = useSelector((state) => state.movie);
  const { search } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (search) {
      dispatch(getSearchMovies(search));
    }
  }, [dispatch, search]);

  return (
    <div className="bg-primary font-mono">
      <img
        src={`${imageUrlUHD}${searchMovie[0]?.backdrop_path}`}
        className="absolute z-0 top-0 w-full h-screen object-cover object-center opacity-20"
        alt=""
      />
      <div className="h-screen absolute z-0 bg-gradient-to-t top-0 from-primary to-transparent w-full"></div>
      <div className="bg-transparent min-h-screen py-20 z-20">
        <h1 className="text-4xl text-white font-bold text-center mb-8">
          {` Hasil Pencarian untuk: "${search}"`}
        </h1>
        {searchMovie.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 md:px-10">
            {searchMovie.map((item) => (
              <Link
                to={`/detailMovie/${item?.id}`}
                key={item.id}
                className="backdrop-blur-lg bg-thirt/50 flex items-center rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
              >
                <div className="w-1/2">
                  <img
                    src={`${
                      item?.poster_path
                        ? `${imageUrlUHD}${item.poster_path}`
                        : errorPng
                    }`}
                    alt={item.title}
                    className="w-full bg-white/40 h-56 object-cover"
                  />
                </div>
                <div className="w-2/3 p-4 flex flex-col justify-between h-full">
                  <h2 className="text-xl text-white font-semibold line-clamp-4">
                    {item.title}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Tanggal Rilis:{" "}
                    <span className="text-white font-medium">
                      {new Date(item.release_date).toLocaleDateString("id-ID")}
                    </span>
                  </p>
                  <div className="flex items-center gap-2">
                    <CiStar className="text-yellow-400 text-xl" />
                    <p className="text-white font-semibold">
                      {item.vote_average.toFixed(1)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="w-full">
            <p className="text-white text-center text-lg">
              {` Tidak ada hasil yang ditemukan untuk kata kunci "${search}".`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
