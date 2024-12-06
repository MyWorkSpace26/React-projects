import { NavLink, useNavigate } from "react-router-dom";
import classes from "../styles/MainNavigation.module.css";

function MainNavigation() {
  const navigate = useNavigate();

  const handleLabelClick = (rout) => {
    rout === "home" ? navigate("/") : navigate("/products");
  };
  return (
    <>
      <nav className={classes.nav}>
        <div className="slider"></div>

        <label
          className="home"
          htmlFor="home"
          onClick={(rout) => {
            handleLabelClick((rout = "home"));
          }}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? classes["active-link"] : "inactive-link"
            }
          >
            <i className="fas fa-home"></i>Home
          </NavLink>
        </label>

        <label
          className="blog"
          htmlFor="blog"
          onClick={(rout) => {
            handleLabelClick((rout = "blog"));
          }}
        >
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? classes["active-link"] : "inactive-link"
            }
          >
            <i className="fa-solid fa-image"></i> Products
          </NavLink>
        </label>
      </nav>
    </>
  );
}

export default MainNavigation;
