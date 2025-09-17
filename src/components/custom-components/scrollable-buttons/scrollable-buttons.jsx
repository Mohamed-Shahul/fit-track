import { Box, Button } from "@mui/material";
import useScrollableButtonsVm from "./useScrollableButtonsVm";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { KeyboardArrowRight } from "@mui/icons-material";
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';

const ScrollableButtons = (props) => {
  const viewModel = useScrollableButtonsVm(props);
  const { handleSelect, selected, buttonRefs } = viewModel;
  const { data, title } = props;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        border: "1px solid silver",
        borderRadius: 1,
        position: "relative", // ✅ so arrows can be placed
        overflow: "hidden",
      }}
    >
      {/* Left Arrow */}
      {/* <Box
        sx={{
          position: "absolute",
          left: 5,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          animation: "blink 1.5s infinite",
          color: "silver",
          pointerEvents: "none", // ✅ not clickable
        }}
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </Box> */}

      {/* Right Arrow */}
      {/* <Box
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          color: "silver",
          animation: "blink 1.5s infinite",
          pointerEvents: "none", // ✅ not clickable,
          zIndex:999999
        }}
      >
        <ArrowRightRoundedIcon fontSize="large" />
      </Box> */}

      {/* Title */}
      <Box
        color="white"
        bgcolor="#1976d2"
        minWidth="30%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius={1}
        fontWeight="bold"
      >
        {title}
      </Box>

      {/* Scrollable Buttons */}
      <Box
        sx={{
          overflowX: "auto",
          display: "flex",
          gap: 2,
          px: 3,
          py: 0.8,
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {data?.length ? (
          data?.map((split, i) => (
            <Button
              key={i}
              ref={(el) => (buttonRefs.current[i] = el)}
              variant={selected === i ? "contained" : "outlined"}
              onClick={() => handleSelect(split, i)}
              sx={{
                px: 4,
                borderRadius: "30px",
                minWidth: "200px",
                maxWidth: "300px",
                height: "30px",
                transform: selected === i ? "scale(0.9)" : "scale(1)",
                transition: "all 0.3s ease",
                boxShadow:
                  selected === i ? "0px 4px 12px rgba(0,0,0,0.25)" : "none",
                zIndex: selected === i ? 2 : 1,
                textTransform: "none",
                fontWeight: "bold",
                ...(selected !== i && {
                  color: "silver",
                  border: "1px solid silver",
                }),
              }}
            >
              <span
                style={{
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap", // ✅ keep in one line
                  maxWidth: "100%", // ✅ match button width
                }}
              >
                {split}
              </span>
            </Button>
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 0.5,
              color: "white",
            }}
          >
            No {title} created...
          </Box>
        )}
      </Box>

      {/* Blink Animation Keyframes */}
      <style>
        {`
          @keyframes blink {
            0% { opacity: 0.2; }
            50% { opacity: 1; }
            100% { opacity: 0.2; }
          }
        `}
      </style>
    </Box>
  );
};

export default ScrollableButtons;
