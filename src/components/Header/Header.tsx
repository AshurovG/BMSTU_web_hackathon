import * as React from "react";
// import cn from 'classnames';
import { observer } from "mobx-react-lite";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Text from "../Text/Text";
import LogoIcon from "components/icons/LogoIcon";
import styles from "./Header.module.scss";
// import FavoritesIcon from 'components/icons/FavoritesIcon';
import AccountIcon from "components/icons/AccountIcon";
import BurgerIcon from "components/icons/BurgerIcon";
import { useLocalStore } from "utils/useLocalStore";
import HeaderStore from "store/HeaderStore";
// import rootStore from "store/RootStore";
import rootStore from "../../store/RootStore";
import ProfileWindow from "components/ProfileWindow";

import ThemeSwitcher from "components/ThemeSwitcher";
import useLocalStorage from "use-local-storage";

import cn from "classnames";

const Header: React.FC = () => {
  const headerStore = useLocalStore(() => new HeaderStore());

  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);

  console.log(headerStore.isBurgerMenuOpen);

  return (
    <div
      className={cn(styles.header, { [styles.dark]: rootStore.theme.isDark })}
    >
      <div className={styles.header__wrapper}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className={styles.header__titleblock}>
            <div className={styles.header__titleblock_title}>Marselle </div>
            <div style={{ fontSize: "10px", verticalAlign: "bottom" }}>
              [by Friday Deployers team]
            </div>
          </div>
        </Link>

        {/* <div className={styles.header__blocks}>
          <div className={styles.header__block}>page 1</div>
          <div className={styles.header__block}>page 2</div>
          <div className={styles.header__block}>page 3</div>
        </div> */}
        <div className={styles.icons}>
          {headerStore.isBurgerMenuOpen === false ? (
            <BurgerIcon
              className={styles.burger__icon}
              color={"primary"}
              onClick={headerStore.setIsBurgerMenuOpen}
            />
          ) : (
            <div
              className={cn(styles.cancel__icon)}
              onClick={headerStore.setIsBurgerMenuOpen}
            ></div>
          )}
        </div>
        {headerStore.isBurgerMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            style={{
              marginTop: 100,
              position: "absolute",
              right: 0,
            }}
          >
            <div
              className={cn(styles.burger__menu, {
                [styles.dark]: rootStore.theme.isDark,
              })}
            >
              <Link className={styles["burger__menu-item"]} to={"/satellite"}>
                Rover
              </Link>
              <Link className={styles["burger__menu-item"]} to={`/`}>
                Satellite
              </Link>
              <Link className={styles["burger__menu-item"]} to={`/`}>
                Submarine
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default observer(Header);
