/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/iframe-has-title */

import {Box, Button, Dialog, DialogContent, DialogTitle} from "@mui/material";

export default function VideoPlayer(props) {
  const {setOpen, open, url, handleCloseVideo} = props;

  const handelClose = () => {
    handleCloseVideo?.();
  };

  function getYouTubeEmbedUrl(url) {
    try {
      const parsedUrl = new URL(url);

      // Handle youtu.be short links
      if (parsedUrl.hostname === "youtu.be") {
        return `https://www.youtube.com/embed/${parsedUrl.pathname.slice(1)}`;
      }

      // Handle shorts URLs
      if (
        parsedUrl.hostname.includes("youtube.com") &&
        parsedUrl.pathname.startsWith("/shorts/")
      ) {
        const videoId = parsedUrl.pathname.split("/shorts/")[1].split("?")[0];
        return `https://www.youtube.com/embed/${videoId}`;
      }

      // Handle normal YouTube watch links
      if (parsedUrl.hostname.includes("youtube.com")) {
        const videoId = parsedUrl.searchParams.get("v");
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
        // If already in embed format, return as is
        if (parsedUrl.pathname.startsWith("/embed/")) {
          return url;
        }
      }

      return null; // Not a valid YouTube URL
    } catch {
      return null; // Invalid URL format
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handelClose}
      slotProps={{
        paper: {
          sx: {
            p: 1,
            border: 1,
            borderColor: "silver",
            borderRadius: 2,
            width: "100vw",
            height: "80vh",
            background: "transparent",
          },
        },
      }}
    >
      <DialogTitle sx={{display: "flex", justifyContent: "right"}}>
        <Button
          variant="contained"
          onClick={handelClose}
          size="small"
          children="Close"
          color="inherit"
          sx={{color: "black", ml: 1}}
        />
      </DialogTitle>
      <DialogContent>
        {getYouTubeEmbedUrl(url) ? (
          <iframe
            width="100%"
            height="400"
            // src={getYouTubeEmbedUrl(
            //   "https://youtube.com/shorts/C90o5ImqzJ0?si=_WejiYIMmbRvv8e3"
            // )}
            // src={getYouTubeEmbedUrl(viewModel.playVideoDetails?.url)}
            src={getYouTubeEmbedUrl(url)}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <Box
            children="Invalid Url"
            color="red"
            fontSize={20}
            width="95%"
            height="80%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
