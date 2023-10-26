import * as React from "react";
// import cn from 'classnames';
import { observer } from "mobx-react-lite";
import cn from "classnames";
import { Link } from "react-router-dom";
import Text from "../Text/Text";
import LogoIcon from "components/icons/LogoIcon";
import styles from "./Header.module.scss";
// import FavoritesIcon from 'components/icons/FavoritesIcon';
import AccountIcon from "components/icons/AccountIcon";
import BurgerIcon from "components/icons/BurgerIcon";
import { useLocalStore } from "utils/useLocalStore";
import HeaderStore from "store/HeaderStore";

import rootStore from "../../store/RootStore";

const Header: React.FC = () => {
  const headerStore = useLocalStore(() => new HeaderStore());

  return (
    <div
      className={cn(styles.header, { [styles.dark]: rootStore.theme.isDark })}
    >
      <div className={styles.header__wrapper}>
        <LogoIcon />
        <Text
          className={cn(styles.header__title, {
            [styles.dark]: rootStore.theme.isDark,
          })}
          view="p-20"
        >
          Project name
        </Text>
        <Text className={styles.header__blocks} tag="span">
          <Link
            className={cn(styles.header__block, {
              [styles.dark]: rootStore.theme.isDark,
            })}
            to={"/"}
          >
            page1
          </Link>
          <Link
            className={cn(styles.header__block, {
              [styles.dark]: rootStore.theme.isDark,
            })}
            to={"/"}
          >
            page2
          </Link>
          <Link
            className={cn(styles.header__block, {
              [styles.dark]: rootStore.theme.isDark,
            })}
            to={"/"}
          >
            page3
          </Link>
        </Text>
        <div className={styles.icons}>
          {/* <FavoritesIcon className={cn(styles.favorite__icon, styles.icons__item)} /> */}
          <Link className={styles.profile__link} to={"/auth"}>
            <AccountIcon
              className={cn(styles.icons__item, {
                [styles.dark]: rootStore.theme.isDark,
              })}
              onClick={headerStore.setIsAuthFormOpen}
            />
          </Link>
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

        {headerStore.isBurgerMenuOpen && (
          <div className={styles.burger__menu}>
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
