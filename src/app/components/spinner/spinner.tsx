"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./Spinner.module.css";

interface SpinnerProps {
  size?: number;
  color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 20, color = "#3498db" }) => {
  return (
    <div className={styles.spinnerContainer}>
      <motion.div 
        className={styles.spinner}
        style={{ width: size, height: size, borderWidth: size * 0.12, borderColor: `${color} transparent transparent transparent` }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );
};
