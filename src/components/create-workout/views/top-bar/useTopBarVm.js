import { useState } from "react";

const useTopBarVm = () => {
  const [openMenuPopup, setOpenMenuPopup] = useState({
    state: false,
    anchorEl: null,
  });

  const handleMenuPopup = (e) => {
    setOpenMenuPopup((prev) => ({
      ...prev,
      state: !prev?.state,
              anchorEl: e.currentTarget,

    }));
  };
  return { openMenuPopup, handleMenuPopup };
};

export default useTopBarVm;
