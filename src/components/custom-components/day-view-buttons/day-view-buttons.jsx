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
    </Box>
  );
};

export default DayViewButtons;
