import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import imgHero from "../../assets/hero-bg.jpg";

function MainNavigation() {
  return (
    <header
      className={classes.header}
      style={{ background: `url(${imgHero}) center/cover no-repeat, #000` }}
    >
      <nav className={classes.nav}>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${classes.link} ${classes.active}` : classes.link
              }
              end
            >
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? `${classes.link} ${classes.active}` : classes.link
              }
            >
              Регистрация
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
