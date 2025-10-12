import { Box, IconButton, Typography } from "@mui/material";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import MenuPopup from "./menu-popup";

const TopBarView = (props) => {
  const { viewModel, topBarVm } = props;
  const { handleMenuPopup, openMenuPopup } = topBarVm;
  const { navigate } = viewModel;

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
          width: "50%",
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
        }}
        onClick={() => navigate("/home")}
      >
        <FitnessCenterRoundedIcon fontSize="medium" sx={{ color: "#2392eb" }} />
        <Typography
          sx={{
            color: "white",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
          }}
          fontSize={22}
          fontWeight="bold"
        >
          Fit track
        </Typography>
      </Box>

      <Box
        sx={{
          width: "50%",
          textAlign: "right",
        }}
      >
        <IconButton
          children={
            <MenuTwoToneIcon fontSize="large" sx={{ color: "#2392eb" }} />
          }
          onClick={(e) => handleMenuPopup(e)}
        />
      </Box>

      {openMenuPopup ? (
        <MenuPopup topBarVm={topBarVm} viewModel={viewModel} />
      ) : (
        <></>
      )}
    </Box>
  );
};

export default TopBarView;
