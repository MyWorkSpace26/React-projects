import React from "react";
import styles from "./EmptyMessage.module.css";

interface EmptyMessageProps {
  message: string;
}

const EmptyMessage: React.FC<EmptyMessageProps> = ({ message }) => {
  return (
    <div className={styles.emptyMessageContainer}>
      <div className={styles.emptyMessageContent}>
        <p className={styles.emptyMessageText}>{message}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={styles.emptyMessageIcon}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
        <p className={styles.emptyMessageInfo}>
          Try adding tasks using the button on top.
        </p>
      </div>
    </div>
  );
};

export default EmptyMessage;
