import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopRatedMovies } from "../../redux/actions/movieAction";
import { CiStar } from "react-icons/ci";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Tilt } from "react-tilt";
import { Link } from "react-router-dom";

const defaultOptions = {
  reverse: false,
  max: 35,
  perspective: 1000,
  scale: 1,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

export default function AllMovie() {
  const imageUrlUHD = import.meta.env.VITE_REACT_W780IMAGE;
  const { topRatedMovie, totalPages } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    dispatch(getTopRatedMovies(pageNumber));
  }, [dispatch, pageNumber]);

  const handlePageChange = (event, value) => {
    setPageNumber(value);
  };

  return (
    <div className="bg-primary min-h-screen py-20">
      <h1 className="text-4xl text-second font-bold text-center mb-8">
        Film Peringkat Tertinggi
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 md:px-10">
        {topRatedMovie.length > 0 ? (
          topRatedMovie.map((item) => (
            <Link key={item.id} to={`/detailMovie/${item?.id}`}>
              <Tilt options={defaultOptions} className="h-full">
                <div className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer hover:border hover:border-fourth hover:drop-shadow-text-bottom-hover transform transition duration-300 hover:scale-105">
                  <img
                    src={`${imageUrlUHD}${item.poster_path}`}
                    alt={item.title}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute bottom-0 p-4 space-y-2 bg-gradient-to-t from-primary via-primary/80 to-primary/10 w-full">
                    <h2
                      className="text-xl text-white font-semibold"
                      style={{
                        textShadow: `
                2px 2px 4px rgba(0, 0, 0, 0.8), 
                -1px -1px 2px rgba(255, 255, 255, 0.2)`,
                      }}
                    >
                      {item.title}
                    </h2>
                    <p
                      className="text-gray-300 text-sm"
                      style={{
                        textShadow: `
                1px 1px 3px rgba(0, 0, 0, 0.6), 
                -1px -1px 1px rgba(255, 255, 255, 0.1)`,
                      }}
                    >
                      Tanggal Rilis:{" "}
                      <span className="text-second font-medium">
                        {new Date(item.release_date).toLocaleDateString(
                          "id-ID"
                        )}
                      </span>
                    </p>
                    <div className="flex items-center gap-2">
                      <CiStar className="text-yellow-400 text-xl" />
                      <p
                        className="text-second font-semibold"
                        style={{
                          textShadow: `
                  1px 1px 3px rgba(0, 0, 0, 0.6), 
                  -1px -1px 1px rgba(255, 255, 255, 0.1)`,
                        }}
                      >
                        {item.vote_average.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>
              </Tilt>
            </Link>
          ))
        ) : (
          <p className="text-second text-center text-lg">
            Tidak ada data film yang tersedia.
          </p>
        )}
      </div>

      <Stack spacing={2} alignItems="center" className="mt-10">
        <Pagination
          size="large"
          count={totalPages}
          page={pageNumber}
          onChange={handlePageChange}
          color="primary"
          variant="outlined"
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#DAA520 !important",
              borderColor: "#DAA520 !important",
              "&:hover": {
                backgroundColor: "orange !important",
                color: "setext-second !important",
              },
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#DAA520 !important",
              color: "#ffffff !important",
            },
          }}
        />
      </Stack>
    </div>
  );
}
