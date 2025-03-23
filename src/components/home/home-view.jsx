import { Box, Card, CardContent, Grid2, Typography } from "@mui/material";
import useHome from "./useHome";
import cloudBg from "../../images/cloudBg.jpg";
import AppBarView from "../app-bar/app-bar-view";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

const Home = () => {
  const viewModel = useHome();
  const { items, navigate } = viewModel;

  const viewButtons = (props) => {
    const { title, url, icon: Icon } = props;
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
          <Icon fontSize="large" sx={{ color: "white" }} />
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              color: "white",
              fontSize:14
            }}
          >
            {title}
          </Typography>
        </CardContent>
      </Card>
    );
  };
  return (
    <Grid2
      container
      sx={{
        height: "100vh",
        backgroundImage: `
          linear-gradient(to right, black 50%, transparent 100%),
          url(${cloudBg})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Grid2
        size={{ xs: 12 }}
        height={{ xs: "5%", md: "10%" }}
        padding={{ xs: 0.5, md: 1 }}
        sx={{
          borderBottom: 1,
          borderBottomColor: "gray",
          position: "sticky",
          top: 0,
        }}
      >
        <AppBarView />
      </Grid2>

      <Grid2
        size={{ xs: 12 }}
        borderColor="white"
        height={{ xs: "95%", md: "90%" }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Box maxWidth="100%" borderColor="white">
          <Typography
            color="white"
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              textAlign: "center",
              fontSize: { xs: 20, md: 34 },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Track your fitness goals
            <TrendingUpRoundedIcon
              sx={{ color: "#1976d2", fontSize: { xs: 25, md: 50 } }}
            />
          </Typography>
        </Box>
        <Box
          borderColor="white"
          maxWidth="100%"
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          {items.map((items, i) => (
            <>{viewButtons(items)}</>
          ))}
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default Home;
