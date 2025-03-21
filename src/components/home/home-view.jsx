import { Box, Grid2, Typography } from "@mui/material";
import useHome from "./useHome";
import gymBg from "../../images/dumbellsBg.jpg";
import dumbells from "../../images/dumbells.avif";

const Home = () => {
  const viewModel = useHome();
  const { items, navigate } = viewModel;
  const itemsBox = (props) => {
    const { title, url, icon: Icon } = props;
    return (
      <Box
        sx={{
          height: { xs: "20vh", md: "25vh" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          borderRadius: 5,
          //   bgcolor: "black",
          opacity: 0.8,
          backgroundImage: `url(${dumbells})`,
          cursor: "pointer",
        }}
        onClick={() => navigate(url)}
      >
        <Box>{<Icon sx={{ color: "#64DD17" }} fontSize="large" />}</Box>
        <Typography fontWeight="bold" sx={{ color: "white" }}>
          {title}
        </Typography>
      </Box>
    );
  };
  return (
    <Grid2
      container
      height="90vh"
      justifyContent="center"
      alignItems="center"
      columnGap={2}
      rowGap={1}
      sx={{
        backgroundImage: `url(${gymBg})`,
        backgroundSize: "cover", // Ensures the image covers the whole area
        backgroundPosition: "center", // Centers the image}}
      }}
    >
      {items.map((items, i) => (
        <Grid2 key={i + 1} size={{ xs: 8, md: 2 }}>
          {itemsBox(items)}
        </Grid2>
      ))}
    </Grid2>
  );
};

export default Home;
