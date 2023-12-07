import { ClipLoader } from "react-spinners";

const Preloader = () => {
  return (
    <div className="preloader-container">
      <div className="backdrop"></div>
      <ClipLoader color="rgba(23, 52, 237, 1)" size={100} />
    </div>
  );
};

export default Preloader;
