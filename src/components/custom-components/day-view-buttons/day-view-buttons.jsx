import { Box, Button } from "@mui/material";
import useDayViewButtonsVm from "./useDayViewButtons";

const DayViewButtons = (props) => {
  const viewModel = useDayViewButtonsVm(props);
  const { handleSelect, selected, buttonRefs } = viewModel;
  const { data, title } = props;

  const isSelected = (props) => {
    const { value } = props;
    return value === selected;
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        borderRadius: "30px",
        position: "relative", // ✅ so arrows can be placed
        overflow: "hidden",
        background:
          "linear-gradient(270deg, #000000, #1a1a1a, #2b2b2b, #000000)", // darker greys
        backgroundSize: "400% 400%",
        animation: "glowBackground 12s ease infinite",
        boxShadow: "0 0 20px rgba(0,0,0,0.8), 0 0 40px rgba(50,50,50,0.4)", // soft dark glow
        // subtle glow
      }}
    >
      <style>
        {`
      @keyframes glowBackground {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `}
      </style>

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
              ref={(el) => {
                if (el) buttonRefs.current[split] = el; // ✅ use value as key
              }}
              variant={isSelected({ value: split }) ? "contained" : "outlined"}
              onClick={() => handleSelect(split, i)}
              sx={{
                borderRadius: "30px",
                minWidth: "70px",
                maxWidth: "300px",
                height: "30px",
                transform: isSelected({ value: split })
                  ? "scale(0.95)"
                  : "scale(1)",
                transition: "all 0.3s ease",
                zIndex: isSelected({ value: split }) ? 2 : 1,
                textTransform: "none",
                fontWeight: "bold",

                // 🌟 Glow for selected
                boxShadow: isSelected({ value: split })
                  ? "0 0 12px rgba(25,118,210,0.7), 0 0 25px rgba(25,118,210,0.6), 0 0 40px rgba(25,118,210,0.4)"
                  : "none",

                // 🎨 Backgrounds
                background: isSelected({ value: split })
                  ? "linear-gradient(135deg, #1976d2, #42a5f5)" // brighter glowing blue gradient
                  : "rgba(28, 28, 28, 0.95)", // muted dark grey

                // 🖋️ Text Colors
                color: isSelected({ value: split }) ? "white" : "#bdbdbd",
              }}
            >
              <span
                style={{
                  width: "100%", // ✅ match button width
                }}
              >
                {split?.slice(0, 3)}
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

export default DayViewButtons;
