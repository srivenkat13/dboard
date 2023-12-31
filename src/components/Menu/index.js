import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEraser,
  faFileArrowDown,
  faPencil,
  faRotateLeft,
  faRotateRight,
  faBroom,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.css";
import { MENU_ITEMS } from "@/constants";
import { menuItemClick, actionItemClick } from "@/slice/menuSlice";

const Menu = () => {
  const dispatch = useDispatch();
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);

  const handleMenuClick = (itemClicked) => {
    dispatch(menuItemClick(itemClicked));
  };

  const handleActionClick = (itemClicked) => {
    dispatch(actionItemClick(itemClicked));
  };
  return (
    <div className={styles.menuContainer}>
      <div
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.PENCIL,
        })}
        onClick={() => {
          handleMenuClick(MENU_ITEMS.PENCIL);
        }}
      >
        <FontAwesomeIcon className={styles.icon} icon={faPencil} />
      </div>
      <div
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.ERASER,
        })}
        onClick={() => {
          handleMenuClick(MENU_ITEMS.ERASER);
        }}
      >
        <FontAwesomeIcon className={styles.icon} icon={faEraser} />
      </div>
      <div
        className={styles.iconWrapper}
        onClick={() => {
          handleActionClick(MENU_ITEMS.CLEAR);
        }}
      >
        <FontAwesomeIcon className={styles.icon} icon={faBroom} />
      </div>
      <div
        className={styles.iconWrapper}
        onClick={() => {
          handleActionClick(MENU_ITEMS.UNDO);
        }}
      >
        <FontAwesomeIcon className={styles.icon} icon={faRotateLeft} />
      </div>
      <div
        className={styles.iconWrapper}
        onClick={() => {
          handleActionClick(MENU_ITEMS.REDO);
        }}
      >
        <FontAwesomeIcon className={styles.icon} icon={faRotateRight} />
      </div>
      <div
        className={styles.iconWrapper}
        onClick={() => {
          handleActionClick(MENU_ITEMS.DOWNLOAD);
        }}
      >
        <FontAwesomeIcon className={styles.icon} icon={faFileArrowDown} />
      </div>
    </div>
  );
};

export default Menu;
