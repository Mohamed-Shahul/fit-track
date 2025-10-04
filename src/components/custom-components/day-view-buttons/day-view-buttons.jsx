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
      }}
    >
      <style>
        {`
    @keyframes cartoonGradient {
      0% { background-position: 200% 0%; }
      100% { background-position: -200% 0%; }
    }

    @keyframes pulseGlow {
      0% { box-shadow: 0 0 12px rgba(25,118,210,0.6), 0 0 25px rgba(25,118,210,0.4); }
      50% { box-shadow: 0 0 22px rgba(25,118,210,0.9), 0 0 40px rgba(25,118,210,0.6); }
      100% { box-shadow: 0 0 12px rgba(25,118,210,0.6), 0 0 25px rgba(25,118,210,0.4); }
    }
        @keyframes cartoonBackground {
        0% { background-position: 200% 0%; }
        100% { background-position: -200% 0%; }
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
                  ? "scale(0.96)"
                  : "scale(1)",
                transition: "all 0.35s ease",
                zIndex: isSelected({ value: split }) ? 2 : 1,
                textTransform: "none",
                fontWeight: "bold",
                color: isSelected({ value: split }) ? "white" : "#bdbdbd",

                // Cartoon-style moving gradient
                background: isSelected({ value: split })
                  ? "linear-gradient(90deg, #0d47a1 20%, #1976d2 40%, #42a5f5 60%, #0d47a1 80%)"
                  : "rgba(28,28,28,0.95)",
                backgroundSize: "200% 100%",
                animation: isSelected({ value: split })
                  ? "cartoonGradient 5s linear infinite, pulseGlow 2s infinite ease-in-out"
                  : "none",

                // Glow for selected button
                boxShadow: isSelected({ value: split })
                  ? "0 0 15px rgba(25,118,210,0.8), 0 0 35px rgba(25,118,210,0.6)"
                  : "none",
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
