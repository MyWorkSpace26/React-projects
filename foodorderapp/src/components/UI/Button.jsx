import styles from "./Button.module.css";

export const Button = ({ children, textOnly, className, ...props }) => {
  let cssClasses = textOnly ? styles.textbutton : styles.button;

  cssClasses += " " + className;
  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
};
