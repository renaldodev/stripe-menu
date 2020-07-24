import React, { useRef, useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { useDimention } from "./dimentions";
import { Context } from "./Provider";
// import { Container } from './styles';

let lastOptionId = 0;
export function DropdownOption({ name, content: Content, backgroundHeight }) {
  const idRef = useRef(++lastOptionId);
  const id = idRef.current;
  const [optionHook, optionDimentions] = useDimention();
  const [registered, setRegistered] = useState(false);

  const {
    registerOption,
    updateOptionProps,
    deletOptionById,
    setTargetId,
    targetId,
  } = useContext(Context);

  useEffect(() => {
    if (!registered && optionDimentions) {
      const WrappedContent = function () {
        const contentRef = useRef();

        useEffect(() => {
          const contentDimentions = contentRef.current.getBoundingClientRect();
          updateOptionProps(id, { contentDimentions });
        }, []);

        return (
          <div ref={contentRef}>
            <Content />
          </div>
        );
      };

      registerOption(id, {
        optionDimentions,
        optionCenterX: optionDimentions.x + optionDimentions.width / 2,
        WrappedContent,
        backgroundHeight,
      });
      setRegistered(true);
    } else if (registered && optionDimentions) {
      const prop = {
        optionDimentions,
        optionCenterX: optionDimentions.x + optionDimentions.width / 2,
      };
      updateOptionProps(id, prop);
    }
  }, [
    registerOption,
    id,
    registered,
    optionDimentions,
    updateOptionProps,
    deletOptionById,
    backgroundHeight,
  ]);

  useEffect(() => deletOptionById(id), [id, deletOptionById]);
  const handleOpen = () => setTargetId(id);
  const handleClose = () => setTargetId(null);
  const handleTouch = () => (window.isMobile = true);

  const handleClick = (e) => {
    e.preventDefault();

    return targetId === id ? handleClose() : handleOpen();
  };
  return (
    <React.Fragment>
      <motion.button
        ref={optionHook}
        className="dropdown-option"
        onMouseDown={handleClick}
        onHoverStart={() => !window.isMobile && handleOpen()}
        onHoverEnd={() => !window.isMobile && handleClose()}
        onTouchStart={handleTouch}
        onFocus={handleOpen}
        onBlur={handleClose}
      >
        {name}
      </motion.button>
    </React.Fragment>
  );
}
