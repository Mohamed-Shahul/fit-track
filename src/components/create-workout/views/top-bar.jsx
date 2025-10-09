import { Box, IconButton } from "@mui/material";
import useCustomHook from "../../custom-hook/useCustomHook";
import ToggleView from "./toggle-view";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CloudUploadTwoToneIcon from "@mui/icons-material/CloudUploadTwoTone";

const TopBar = (props = {}) => {
  const {  viewModel } = props;
  const { cloudBgImg } = useCustomHook();
  const { navigate, setOpenAccountInfoPopup, openAccountInfoPopup } = viewModel;

  return (
    <Box
      sx={{
        maxWidth: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        color: "white",
      }}
    >
      <Box
        sx={{
          width: "100%",
          textAlign: "right",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <IconButton
              onClick={() => navigate("/home")}
              children={
                <LogoutRoundedIcon
                  fontSize="large"
                  color="error"
                  sx={{ transform: "rotate(-180deg)" }}
                />
              }
            />
            <ToggleView />
          </Box>
          <Box>
            <IconButton
              children={<DeleteOutlinedIcon fontSize="large" color="error" />}
            />
            <IconButton
              onClick={() => navigate("/home")}
              children={
                <CloudUploadTwoToneIcon fontSize="large" color="info" />
              }
            />
          </Box>
        </>
      </Box>
    </Box>
  );
};

export default TopBar;
