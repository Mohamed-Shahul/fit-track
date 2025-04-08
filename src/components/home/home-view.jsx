import {Box, Card, CardContent, Grid2, Typography} from "@mui/material";
import useHome from "./useHome";
import AppBarView from "../app-bar/app-bar-view";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import useCustomHook from "../custom-hook/useCustomHook";

const Home = () => {
  const {cloudBgImg} = useCustomHook();
  const viewModel = useHome();
  const {items, navigate} = viewModel;

  const viewButtons = (props) => {
    const {title, url, icon: Icon} = props;
    return (
      <Card
        sx={{
          borderRadius: 2,
          padding: "5px",
          bgcolor: "#1976d2",
          "&:hover": {
            bgcolor: "#1565c0",
            cursor: "pointer",
          },
        }}
        onClick={() => navigate(url)}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Icon fontSize="large" sx={{color: "white"}} />
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              color: "white",
              fontSize: 14,
            }}
          >
            {title}
          </Typography>
        </CardContent>
      </Card>
    );
  };
  return (
    <Grid2 container height="100vh">
      <Grid2
        size={{xs: 12}}
        height="7%"
        sx={{
          position: "sticky",
          top: 0,
          borderBottom: 1,
          borderBottomColor: "gray",
          px: 2,
          ...cloudBgImg,
        }}
      >
        <AppBarView />
      </Grid2>

      <Grid2
        size={{xs: 12}}
        height="93%"
        display="flex"
        flexDirection="column"
        justifyContent="top"
        alignItems="center"
        gap={2}
      >
        <Box maxWidth="100%" mt={{xs: 5, md: 10}}>
          <Typography
            color="white"
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              textAlign: "center",
              fontSize: {xs: 20, md: 34},
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Track your fitness goals
            <TrendingUpRoundedIcon
              sx={{color: "#1976d2", fontSize: {xs: 25, md: 50}}}
            />
          </Typography>
        </Box>
        <Box
          maxWidth="100%"
          display="flex"
          flexDirection={{xs: "column", md: "row"}}
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          {items.map((items, i) => (
            <Box minWidth={{xs: "100%", md: ""}}>{viewButtons(items)}</Box>
          ))}
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default Home;
