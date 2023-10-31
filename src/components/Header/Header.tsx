import * as React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import cn from "classnames";

const Header: React.FC = () => {
  return (
    <div
      className={cn(styles.header)}
    >
      <div className={styles.header__wrapper}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className={styles.header__titleblock}>
            <div className={styles.header__titleblock_title}>Nautilus </div>
            <div style={{ fontSize: "10px", verticalAlign: "bottom" }}>
              [by Friday Deployers team]
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default observer(Header);
