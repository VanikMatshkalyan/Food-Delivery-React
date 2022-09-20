import React from "react";
import styles from "./index.module.css";

function Error404(): JSX.Element {
  return (
    <div>
      <p className={styles.not_found}>404 Page Not Found</p>
    </div>
  );
}

export default Error404;
