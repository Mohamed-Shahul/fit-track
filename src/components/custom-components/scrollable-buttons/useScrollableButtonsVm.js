import { useRef, useState } from "react";

const useScrollableButtonsVm = (props) => {
  const {  handleClick } = props;
  const [selected, setSelected] = useState(null);
  const buttonRefs = useRef([]); // store refs for each button

  const handleSelect = (row, i) => {
    setSelected(i);
    handleClick(row, i);
    // scroll the clicked button to the center
    buttonRefs.current[i]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };
  return { selected, handleSelect, buttonRefs };
};

export default useScrollableButtonsVm;
