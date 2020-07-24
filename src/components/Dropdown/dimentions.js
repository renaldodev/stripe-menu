import{
  useState,
  useCallback,
  useLayoutEffect,
} from "react";

const getDimentions = (element) => element.getBoundingClientRect();

export function useDimention(responsive = true) {
  const [dimentions, setDimentions] = useState(null);
  const [element, setElement] = useState(null);

  const hook = useCallback((e) => setElement(e), []);

  useLayoutEffect(() => {
    if (element) {
      const updateDimention = () => {
        window.requestAnimationFrame(() => {
          setDimentions(getDimentions(element));
        });
      };
      updateDimention();
      if (responsive) {
        window.addEventListener("resize", updateDimention);

        return () => {
          window.removeEventListener("resize", updateDimention);
        };
      }
    }
  }, [hook,element, responsive  ]);

  return [hook, dimentions, element];
}
