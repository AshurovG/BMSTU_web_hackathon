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

import naut from "assets/icons/nautilus.png";

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
