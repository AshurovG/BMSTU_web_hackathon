import { useState } from "react";
import Header from "components/Header";
import ModalWindow from "components/ModalWindow";
import RoverInfo from "components/RoverInfo";
import { observer } from "mobx-react-lite";
import styles from "./SatellitePage.module.scss";
import cn from "classnames";
import rootStore from "store/RootStore";
import Map from "components/Map";



const SatellitePage = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const mapHDepth = 100;

  const pointZ = (rootStore.satellite.rover.z / mapHDepth) * 100;

  return (
    <div
      className={cn(styles.sat__page)}
    >
      <Header></Header>
      <div className={styles.sat__page_wrapper}>
        <div className={styles.sat__page_rover}>
          <Map />
          <div className={styles.profile__view}>
            <div
              className={styles.rover}
              style={{
                top: `${pointZ}%`,
              }}
            ></div>
          </div>

          <RoverInfo />
          {rootStore.satellite.rover.charge === 0 && <ModalWindow handleBackdropClick={() => setModalVisible(!modalVisible)} className={styles.form__modal} active={modalVisible}>
            Устройство разряжено !
          </ModalWindow>}
        </div>
      </div>
    </div>
  );
};

export default observer(SatellitePage);
