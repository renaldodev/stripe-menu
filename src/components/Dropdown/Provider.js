import React, { useState, useCallback, useEffect } from "react";

export const Context = React.createContext();

export function DropdownProvider({ children }) {
  const [option, setOption] = useState([]);
  const [targetId, setTargetId] = useState(null);
  const [cachedId, setCachedId] = useState(null);

  const registerOption = useCallback(
    (
      id,
      {
        optionDimentions,
        optionCenterX,
        WrappedContent,
        backgroundHeight,
      }
    ) => {
      setOption((items) => [
        ...items,
        {
          id,
          optionDimentions,
          optionCenterX,
          WrappedContent,
          backgroundHeight,
        },
      ]);
    },
    [setOption]
  );

  const updateOptionProps = useCallback(
    (optionId, props) => {
      setOption((items) =>
        items.map((item) => {
          if (item.id === optionId) {
            item = { ...item, ...props };
          }
          return item;
        })
      );
    },
    [setOption]
  );

  const getOptionById = useCallback(
    (optionId) => option.find((item) => item.id === optionId),
    [setOption]
  );

  const deletOptionById = useCallback(
    (optionId) => option.filter((item) => item.id !== optionId),
    [setOption]
  );

  useEffect(() => {
    if (targetId !== null) setCachedId(targetId);
  }, [targetId]);
  return (
    <Context.Provider
      value={{
        registerOption,
        updateOptionProps,
        getOptionById,
        deletOptionById,
        option,
        targetId,
        setTargetId,
        cachedId,
        setCachedId,
      }}
    >
      {children}
    </Context.Provider>
  );
}
