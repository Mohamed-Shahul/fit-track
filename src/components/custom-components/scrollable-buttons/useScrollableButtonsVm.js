import { useEffect, useRef, useState } from "react";

const useScrollableButtonsVm = (props) => {
  const { handleClick, defaultValue } = props;
  const [selected, setSelected] = useState(defaultValue || null);
  const buttonRefs = useRef({}); // store refs for each button

  useEffect(() => {
    if (defaultValue?.length) {
      setSelected(defaultValue);
       buttonRefs.current[defaultValue]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
    }
  }, [defaultValue]);

  const handleSelect = (rowValue, i) => {
    setSelected(rowValue);
    handleClick(rowValue, i);
    // scroll the clicked button to the center
    buttonRefs.current[rowValue]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };
  return { selected, handleSelect, buttonRefs };
};

export default useScrollableButtonsVm;
