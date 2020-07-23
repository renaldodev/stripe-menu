import React, { useContext } from "react";
import { Context } from "./Provider";
import { motion } from "framer-motion";

// import { Container } from './styles';

export function DropdownSection({ option }) {
  const { cachedId } = useContext(Context);
  const { id, optionCenterX, contentDimentions } = option;
  const isActive = cachedId === id;

  const contentWidth = contentDimentions?.width || 0;
  const x = optionCenterX - contentWidth / 2;
  return (
    <motion.div
      className="dropdown-section"
      initial={{ x, opacity: 0 }}
      animate={{
        x,
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? "unset" : "none",
      }}
      transition={{
        ease: "easeOut",
      }}
    >
      <option.WrappedContent />
    </motion.div>
  );
}
