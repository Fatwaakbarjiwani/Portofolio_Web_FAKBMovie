import Modal from "react-modal";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../redux/reducers/movieReducer";
import { useEffect } from "react";
import { getVideoMovies } from "../../redux/actions/movieAction";

const ModalWatch = () => {
  const { isOpen } = useSelector((state) => state.movie);
  const { idMovie } = useSelector((state) => state.movie);
  const { videoMovie } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  const closeModal = () => dispatch(setOpen(false));

  useEffect(() => {
    if (idMovie) {
      dispatch(getVideoMovies(idMovie));
    }
  }, [idMovie]);

  return (
    <div className="flex flex-col items-center justify-center">
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Video Modal"
        className="fixed inset-0 z-50 flex items-center justify-center"
        overlayClassName="bg-gray-900 bg-opacity-50 fixed inset-0 z-40"
      >
        <div className="relative p-6 rounded-lg w-full max-w-2xl">
          <button
            onClick={closeModal}
            className="absolute top-0 right-0 text-2xl text-second hover:scale-110 duration-150"
          >
            <MdClose />
          </button>
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
        </div>
      </Modal>
    </div>
  );
};

export default ModalWatch;
