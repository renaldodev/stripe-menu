import React, { useContext, useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Context } from "./Provider";
import { DropdownSection } from "./index";

export function DropdownRoot() {
  const { option, cachedId, getOptionById, targetId } = useContext(Context);
  const cachedOption = useMemo(() => getOptionById(cachedId), [
    cachedId,
    getOptionById,
  ]);

  let [width, height, x] = [0, 0, 0];

  if (cachedOption) {
    const { optionCenterX, contentDimentions } = cachedOption;

    width = contentDimentions?.width;
    height = contentDimentions?.height;
    x = optionCenterX - width / 2;
    console.log(optionCenterX);
  }

  const [hovering, setHovering] = useState(false);
  const isActive = targetId !== null || hovering;

  const [hasInterected, setHasInterected] = useState(false);
  const isFirstInteration = isActive && !hasInterected;

  if (isFirstInteration) {
    setTimeout(() => {
      if (!hasInterected) setHasInterected(true);
    }, 15);
  }

  useEffect(() => {
    if (isActive) return;
    const timeout = setTimeout(() => {
      setHasInterected(true);
    }, 0.22 * 1000 * 0.9);

    return () => clearTimeout(timeout);
  }, [isActive]);
  return (
    <div style={{ perspective: 2000 }}>
      <motion.div
        className="dropdown-root"
        animate={{
          opacity: isActive ? 1 : 0,
          rotateX: isActive ? 0 : -15,
        }}
        transition={{
          opacity: { duration: 0.22, delay: 0.05 },
          rotateX: { duration: 0.22, delay: 0.05 },
        }}
      >
        <motion.div
          className="dropdown-container"
          animate={{
            x,
            width,
            height,
            pointerEvents: isActive ? "unset" : "none",
          }}
          transition={{
            ease: "easeOut",
            x: { duration: isFirstInteration ? 0 : 0.22 },
            width: { duration: isFirstInteration ? 0 : 0.22 * 0.93 },
            height: { duration: isFirstInteration ? 0 : 0.22 * 0.93 },
            pointerEvents: { delay: 0.05 },
          }}
          onHoverStart={() => setHovering(true)}
          onHoverEnd={() => setHovering(false)}
        >
          <DropdownBackground />
          <motion.div
            animate={{ x: -x }}
            transition={{
              ease: "easeOut",
              x: { duration: isFirstInteration ? 0 : undefined },
            }}
          >
            {option.map((item) => (
              <DropdownSection key={item.id} option={item} />
            ))}
          </motion.div>
        </motion.div>
        <DropdownArrow isFirstInteration={isFirstInteration} />
      </motion.div>
    </div>
  );
}

function DropdownArrow({ isFirstInteration }) {
  const { cachedId, getOptionById } = useContext(Context);

  const cachedOption = useMemo(() => getOptionById(cachedId), [
    cachedId,
    getOptionById,
  ]);

  const x = cachedOption ? cachedOption.optionCenterX : 0;
  return (
    <motion.div
      className="dropdown-arrow"
      initial={{ opacity: 0 }}
      animate={{ x, pointerEvents: "none", opacity: x > 0 ? 1 : 0 }}
      transition={{ ease: "easeOut", duration: isFirstInteration ? 0 : 0.22 }}
    ></motion.div>
  );
}

function DropdownBackground() {
  const { cachedId, getOptionById } = useContext(Context);
  const cachedOption = useMemo(() => getOptionById(cachedId), [
    cachedId,
    getOptionById,
  ]);
  const backgroundHeight=cachedOption?.backgroundHeight ||0;
  return (
    <motion.div
      className="dropdown-background"
      animate={{height:backgroundHeight}}
      transition={{ ease: "easeOut", duration: 0.22 }}
    ></motion.div>
  );
}
