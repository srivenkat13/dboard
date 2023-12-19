import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./index.module.css";
import { COLORS, MENU_ITEMS } from "@/constants";
import { changeBrushSize, changeColor } from "@/slice/toolbarSlice";

const Toolbar = () => {
  const dispatch = useDispatch();
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const { color, size } = useSelector((state) => state.toolbar[activeMenuItem]);
  const showColorPanel = activeMenuItem === MENU_ITEMS.PENCIL;

  const updateBrushSize = (e) => {
    dispatch(changeBrushSize({ item: activeMenuItem, size: e.target.value }));
  };

  const updateColor = (newColor) => {
    dispatch(changeColor({ item: activeMenuItem, color: newColor }));
  };

  return (
    <div className={styles.toolBarContainer}>
      {showColorPanel && (
        <div className={styles.toolItems}>
          <h4 className={styles.toolText}>Stroke Color</h4>
          <div className={styles.itemContainer}>
            <div
              className={cx(styles.box, {
                [styles.active]: color === COLORS.BLACK,
              })}
              style={{ backgroundColor: COLORS.BLACK }}
              onClick={() => {
                updateColor(COLORS.BLACK);
              }}
            />
            <div
              className={cx(styles.box, {
                [styles.active]: color === COLORS.BLUE,
              })}
              style={{ backgroundColor: COLORS.BLUE }}
              onClick={() => {
                updateColor(COLORS.BLUE);
              }}
            />
            <div
              className={cx(styles.box, {
                [styles.active]: color === COLORS.RED,
              })}
              style={{ backgroundColor: COLORS.RED }}
              onClick={() => {
                updateColor(COLORS.RED);
              }}
            />
            <div
              className={cx(styles.box, {
                [styles.active]: color === COLORS.GREEN,
              })}
              style={{ backgroundColor: COLORS.GREEN }}
              onClick={() => {
                updateColor(COLORS.GREEN);
              }}
            />
            <div
              className={cx(styles.box, {
                [styles.active]: color === COLORS.YELLOW,
              })}
              style={{ backgroundColor: COLORS.YELLOW }}
              onClick={() => {
                updateColor(COLORS.YELLOW);
              }}
            />
            <div
              className={cx(styles.box, {
                [styles.active]: color === COLORS.ORANGE,
              })}
              style={{ backgroundColor: COLORS.ORANGE }}
              onClick={() => {
                updateColor(COLORS.ORANGE);
              }}
            />
          </div>
        </div>
      )}

      <div className={styles.toolItems}>
        <h4 className={styles.toolText}>
        {showColorPanel ? "Brush" : "Eraser"} size
        </h4>
        <div className={styles.itemContainer}>
          <input
            className={styles.slider}
            type="range"
            min={1}
            max={10}
            step={1}
            onChange={updateBrushSize}
            value={size}
          />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
