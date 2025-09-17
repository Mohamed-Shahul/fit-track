import { Box, Button } from "@mui/material";
import useScrollableButtonsVm from "./useScrollableButtonsVm";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import { KeyboardArrowRight } from "@mui/icons-material";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";

const ScrollableButtons = (props) => {
  const viewModel = useScrollableButtonsVm(props);
  const { handleSelect, selected, buttonRefs } = viewModel;
  const { data, title, defaultValue } = props;

  const isSelected = (props) => {
    const { value } = props;
    console.log("==val", value, defaultValue, selected);

    return value === selected;
  };

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
      

      {/* Right Arrow */}
      <Box
        sx={{
          position: "absolute",
          right: 0,
          top: "55%",
          transform: "translateY(-50%)",
          color: "silver",
          animation: "blink 1.5s infinite",
          pointerEvents: "none", // ✅ not clickable,
          zIndex: 999999,
        }}
      >
        <ArrowRightRoundedIcon fontSize="large" />
      </Box>

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
          py: 0.5,
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {data?.length ? (
          data?.map((split, i) => (
            <Button
              key={i}
              // ref={(el) => (buttonRefs.current[i] = el)}
              ref={(el) => {
                if (el) buttonRefs.current[split] = el; // ✅ use value as key
              }}
              variant={isSelected({ value: split }) ? "contained" : "outlined"}
              onClick={() => handleSelect(split, i)}
              sx={{
                px: 4,
                borderRadius: "30px",
                minWidth: "200px",
                maxWidth: "300px",
                height: "30px",
                transform: isSelected({ value: split })
                  ? "scale(0.9)"
                  : "scale(1)",
                transition: "all 0.3s ease",
                boxShadow: isSelected({ value: split })
                  ? "0px 4px 12px rgba(0,0,0,0.25)"
                  : "none",
                zIndex: isSelected({ value: split }) ? 2 : 1,
                textTransform: "none",
                fontWeight: "bold",
                ...(selected !== split && {
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
            No {title} found...
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
