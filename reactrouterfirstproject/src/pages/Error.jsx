import MainNavigation from "../components/MainNavigation";
import "../styles/styles.scss";
import errorimage from "../assets/Scarecrow.png";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <>
      <MainNavigation />
      <h1 className="nav">404 Not found</h1>
      <div className="display">
        <div className="display__img">
          <img src={errorimage} alt="404-Scarecrow" />
        </div>
        <div className="display__content">
          <h2 className="display__content--info">I have bad news for you</h2>
          <p className="display__content--text">
            The page you are looking for might be removed or is temporarily
            unavailable
          </p>
          <button className="btn">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Back to homepage
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
