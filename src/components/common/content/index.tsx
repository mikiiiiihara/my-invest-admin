import React, { ReactNode } from "react";
import styles from "./content.module.scss";

type Props = {
  children: ReactNode;
};

const ContentComponent: React.FC<Props> = ({ children }) => {
  return <div className={styles.content}>{children}</div>;
};
ContentComponent.displayName = "Content";
export const Content = React.memo(ContentComponent);
