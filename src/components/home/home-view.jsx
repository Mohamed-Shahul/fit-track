import React from "react";
import Button from "@mui/material/Button";
import {Box, Grid2, Typography} from "@mui/material";
import useHome from "./useHome";
import gymBg from "../../images/dumbellsBg.jpg";
import dumbells from "../../images/dumbells.avif";

const Home = () => {
  const viewModel = useHome();
  const {items} = viewModel;
  const itemsBox = (props) => {
    const {title, url, icon: Icon} = props;
    return (
      <Box
        border={1}
        sx={{
          height: "25vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          borderRadius: 5,
          //   bgcolor: "black",
            opacity: 0.8,
          backgroundImage: `url(${dumbells})`,
        }}
      >
        <Box>{<Icon sx={{color: "#64DD17"}} fontSize="large" />}</Box>
        <Typography fontWeight="bold" sx={{color: "white"}}>
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
      gap={2}
      sx={{
        backgroundImage: `url(${gymBg})`,
        backgroundSize: "cover", // Ensures the image covers the whole area
        backgroundPosition: "center", // Centers the image}}
      }}
    >
      {items.map((items, i) => (
        <Grid2 key={i + 1} size={{md: 2}}>
          {itemsBox(items)}
        </Grid2>
      ))}
    </Grid2>
  );
};

export default Home;
