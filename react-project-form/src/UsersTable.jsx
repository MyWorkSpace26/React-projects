import React from "react";
import { useSelector } from "react-redux";
import classes from "./UserTable.module.css"; // Импорт CSS-модуля

const UserTable = () => {
  const users = useSelector((state) => state.users);

  return (
    <div className={classes.container}>
      <div className={classes.table}>
        <div className={classes["table-header"]}>
          <div className={classes["header__item"]}>Имя</div>
          <div className={classes["header__item"]}>Фамилия</div>
          <div className={classes["header__item"]}>Email</div>
          <div className={classes["header__item"]}>Телефон</div>
        </div>
        {users.length > 0 ? (
          users.map((user, index) => (
            <div className={classes["table-row"]} key={index}>
              <div className={classes["table-data"]}>{user.firstName}</div>
              <div className={classes["table-data"]}>{user.lastName}</div>
              <div className={classes["table-data"]}>{user.email}</div>
              <div className={classes["table-data"]}>{user.phone}</div>
            </div>
          ))
        ) : (
          <div className={classes["table-row"]}>
            <div className={classes["table-data"]} colSpan="4">
              Пользователи отсутствуют
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTable;
