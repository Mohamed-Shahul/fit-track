import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import cloudBg from "../../../images/cloudBg.jpg";
import useCustomHook from "../../custom-hook/useCustomHook";
import SlideshowRoundedIcon from "@mui/icons-material/SlideshowRounded";
import VideoPlayer from "../../common-components/video-player";

const DemoVideoListDialog = (props) => {
  const {scrollBarStyle} = useCustomHook();

  const {open, setOpen, viewModel} = props;

  const selectedVideoLinkDemoList =
    viewModel.workoutDetails?.[viewModel.selectedSplit]?.[
      viewModel?.selectedDay
    ]?.workoutList?.filter(
      (row) => row?.name === viewModel.selectedWorkout
    )?.[0]?.demoLinks || [];

  const handleClose = () => {
    setOpen?.((prev) => {
      return {
        ...prev,
        state: false,
      };
    });
  };

  const tableView = (data) => {
    return (
      <Box
        sx={{
          py: 1,
          px: 2,
          color: "white",
          borderRadius: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          overflow: "hidden",
        }}
      >
        {data?.length ? (
          data?.map((val, i) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                draggable
                type="text"
                variant="outlined"
                autoComplete="off"
                size="small"
                sx={{
                  border: "none",
                  borderRadius: 2,
                  width: "100%",
                  borderColor: "white",
                  "& .MuiInputBase-input": {
                    color: "white",
                    fontFamily: "Poppins, sans-serif",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {borderColor: "#444451"},
                    "&:hover fieldset": {borderColor: "gray"},
                    "&.Mui-focused fieldset": {borderColor: "gray"},
                  },
                  background: "#444451",
                }}
                placeholder="video link"
                slotProps={{
                  input: {
                    endAdornment: (
                      <>
                        <IconButton
                          children={
                            <SlideshowRoundedIcon
                              fontSize="large"
                              color="info"
                            />
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            viewModel.setPlayVideoDetails((prev) => ({
                              ...prev,
                              url: val,
                              open: true,
                            }));
                          }}
                        />
                      </>
                    ),
                  },
                }}
                value={val}
              />
            </Box>
          ))
        ) : (
          <Box
            sx={{
              maxWidth: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            "No links"
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      slotProps={{
        paper: {
          sx: {
            p: 1,
            border: 1,
            borderColor: "silver",
            borderRadius: 2,
            backgroundImage: `
      linear-gradient(to right, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0.3) 70%, transparent 100%),
      url(${cloudBg})
    `,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100vw",
            height: "80vh",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          color: "silver",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography children="Tutorials" fontWeight="bold" fontSize={20} />

        <Box>
          <Button
            variant="contained"
            onClick={handleClose}
            size="small"
            children="Close"
            color="inherit"
            sx={{color: "black", ml: 1}}
          />
        </Box>
      </DialogTitle>
      <Box
        sx={{
          maxWidth: "100%",
          maxHeight: "100%",
          overflow: "auto",
          overflowX: "hidden",
          px: 2,
          py: 2,
          ...scrollBarStyle,
        }}
      >
        {tableView(selectedVideoLinkDemoList)}
      </Box>

      {viewModel.playVideoDetails?.open ? (
        <VideoPlayer
          open={viewModel.playVideoDetails?.open}
          url={viewModel.playVideoDetails?.url}
          handleCloseVideo={() => {
            viewModel.setPlayVideoDetails((prev) => ({
              ...prev,
              open: false,
              url: "",
            }));
          }}
        />
      ) : (
        <></>
      )}
    </Dialog>
  );
};

export default DemoVideoListDialog;
