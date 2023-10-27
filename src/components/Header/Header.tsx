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
      <div className={styles.header__wrapper}>
        <LogoIcon />
        <Text className={styles.header__title} view="p-20">
          Project name
        </Text>
        <Text className={styles.header__blocks} tag="span">
          <Link className={styles.header__block} to={"/"}>
            page1
          </Link>
          <Link className={styles.header__block} to={`/`}>
            page2
          </Link>
          <Link className={styles.header__block} to={`/`}>
            page3
          </Link>
        </Text>
        <ThemeSwitcher isChecked={isDark} onChange={() => setIsDark(!isDark)} />
        <div className={styles.icons}>
          {/* <FavoritesIcon className={cn(styles.favorite__icon, styles.icons__item)} /> */}
          {!rootStore.userAuth.isLogin ? (
            <Link className={styles.profile__link} to={"/auth"}>
              <AccountIcon
                className={styles.icons__item}
                onClick={headerStore.setIsAuthFormOpen}
              />
            </Link>
          ) : (
            <span
              onClick={headerStore.setIsProfileButtonClicked}
              className={styles.profile__link}
            >
              <AccountIcon
                className={styles.icons__item}
                onClick={headerStore.setIsAuthFormOpen}
              />
            </span>
          )}
          {headerStore.isBurgerMenuOpen === false ? (
            <BurgerIcon
              className={styles.burger__icon}
              color="accent"
              onClick={headerStore.setIsBurgerMenuOpen}
            />
          ) : (
            <div
              className={styles.cancel__icon}
              onClick={headerStore.setIsBurgerMenuOpen}
            ></div>
          )}
        </div>
        <AnimatePresence>
          {rootStore.userAuth.isLogin && headerStore.isProfileButtonClicked && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              style={{
                marginTop: 350,
                position: "absolute",
                right: 0,
              }}
            >
              <ProfileWindow
                username={rootStore.userAuth.userInfo.username}
                fullname={rootStore.userAuth.userInfo.fullname}
                onClick={() => rootStore.userAuth.setIsLogin(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {headerStore.isBurgerMenuOpen && (
          <div
            className={cn(styles.burger__menu, {
              [styles.dark]: rootStore.theme.isDark,
            })}
          >
            <Link className={styles["burger__menu-item"]} to={"/"}>
              page1
            </Link>
            <Link className={styles["burger__menu-item"]} to={`/`}>
              page2
            </Link>
            <Link className={styles["burger__menu-item"]} to={`/`}>
              page3
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(Header);
