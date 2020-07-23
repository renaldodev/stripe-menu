import React, { useContext, useMemo } from "react";
import { motion } from "framer-motion";
import { Context } from "./Provider";
import { DropdownSection } from "./index";

export function DropdownRoot() {
  const { option, cachedId, getOptionById } = useContext(Context);
  const cachedOption = useMemo(() => getOptionById(cachedId), [
    cachedId,
    getOptionById,
  ]);

  let [width, height, x] = [0, 0, 0];

  if (cachedOption) {
    const { optionCenterX, contentDimention } = cachedOption;

    width = contentDimention?.width;
    height = contentDimention?.height;
    x = optionCenterX - width / 2;
  }

  return (
    <div className="dropdown-root">
      <motion.div className="dropdown-container" animate={{ x, width, height }}>
        <div>
          {option.map((item) => (
            <DropdownSection key={item.id} option={item} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
