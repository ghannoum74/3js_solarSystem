import { faEarthAmericas, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Loading = () => {
  return (
    <div className="container-loading">
      <FontAwesomeIcon
        className="earth"
        icon={faEarthAmericas}
        style={{ color: "#368abf" }}
      />
      <div className="target"></div>
      <FontAwesomeIcon
        className="sun"
        icon={faSun}
        style={{ color: "#FFD43B" }}
      />
    </div>
  );
};

export default Loading;
