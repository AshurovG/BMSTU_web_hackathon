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

  return (
    <div
      className={cn(styles.header, { [styles.dark]: rootStore.theme.isDark })}
    >
      
    </div>
  );
};

export default observer(Header);
