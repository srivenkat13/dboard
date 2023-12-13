import styles from "./index.module.css";
import { COLORS } from "@/constants";

const Toolbar = () => {
  const updateStrokeWidth = (e) => {
    //
  };
  return (
    <div className={styles.toolBarContainer}>
      <div className={styles.toolItems}>
        <h4 className={styles.toolText}>Stroke Color</h4>
        <div className={styles.itemContainer}>
          <div
            className={styles.box}
            style={{ backgroundColor: COLORS.BLACK }}
          />
          <div
            className={styles.box}
            style={{ backgroundColor: COLORS.BLUE }}
          />
          <div className={styles.box} style={{ backgroundColor: COLORS.RED }} />
          <div
            className={styles.box}
            style={{ backgroundColor: COLORS.GREEN }}
          />
          <div
            className={styles.box}
            style={{ backgroundColor: COLORS.YELLOW }}
          />
          <div
            className={styles.box}
            style={{ backgroundColor: COLORS.ORANGE }}
          />
        </div>
      </div>
      <div className={styles.toolItems}>
        <h4 className={styles.toolText}>Brush size</h4>
        <div className={styles.itemContainer}>
          <input
           className={styles.slider}
            type="range"
            min={1}
            max={10}
            step={1}
            onChange={updateStrokeWidth}
          />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
