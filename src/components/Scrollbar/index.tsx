import React, { ReactElement } from "react";
import PropTypes from "prop-types";
import styles from "./index.module.less";

type TProps = {
  children: ReactElement;
  height?: string | number;
};

function Scrollbar(props: TProps) {
  return (
    <div style={{ height: props.height }} className={styles.wrapper}>
      {props.children}
    </div>
  );
}

Scrollbar.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Scrollbar;
