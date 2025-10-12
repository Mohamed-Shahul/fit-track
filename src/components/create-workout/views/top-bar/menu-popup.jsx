import {
  ClickAwayListener,
  Fade,
  Paper,
  Popper,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import img from "../../../../images/cloudBg.jpg";

const MenuPopup = (props) => {
  const { topBarVm, viewModel } = props;
  const { openMenuPopup } = topBarVm;
  const { radioButtonValue, handleEditRadioFetch } = viewModel;

  return (
    <>
      <ClickAwayListener onClickAway={() => console.log()}>
        <Popper
          open={openMenuPopup?.state}
          anchorEl={openMenuPopup?.anchorEl}
          placement="bottom-start"
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper
                sx={{
                  width: "250px",
                  height: "120px",
                  borderRadius: 1,
                  p: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "left",
                  alignItems: "left",
                  backgroundImage: `url(${img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <Typography
                  children="Mode"
                  fontWeight="bold"
                  color="white"
                  textAlign="center"
                  borderBottom="1px solid silver"
                />
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="create"
                  name="radio-buttons-group"
                  sx={{
                    display: "flex",
                    fontFamily: "Poppins, sans-serif",
                  }}
                  value={radioButtonValue}
                  onChange={(e) => {
                    handleEditRadioFetch(e?.target?.value);
                  }}
                >
                  <FormControlLabel
                    value="create"
                    control={
                      <Radio
                        sx={{
                          color: "#1565c0",
                          "&.Mui-checked": { color: "#1565c0" },
                        }}
                      />
                    }
                    label="Create split"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        color: "white",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 500,
                      },
                    }}
                  />
                  <FormControlLabel
                    value="edit"
                    control={
                      <Radio
                        sx={{
                          color: "#1565c0",
                          "&.Mui-checked": { color: "#1565c0" },
                        }}
                      />
                    }
                    label="Edit split"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        color: "white",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 500,
                      },
                    }}
                  />
                </RadioGroup>
              </Paper>
            </Fade>
          )}
        </Popper>
      </ClickAwayListener>
    </>
  );
};

export default MenuPopup;
