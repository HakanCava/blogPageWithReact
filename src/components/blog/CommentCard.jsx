import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name?.charAt(0).toUpperCase()}`,
  };
}

const CommentCard = ({ comment, messagesEndRef }) => {
  return (
    <>
      <Paper elevation={10} key={comment.id} sx={{ mb: 2, p: 3 }}>
        <Stack direction="row" spacing={2}>
          <Avatar {...stringAvatar(`${comment.user}`)} />
        </Stack>
        <Typography>{comment.content}</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>
              {new Date(`${comment.time_stamp}`).toLocaleTimeString("tr-TR")}
            </Typography>
            <Typography sx={{ fontWeight: 900 }}>/</Typography>
            <Typography>
              {new Date(`${comment.time_stamp}`).toLocaleDateString("tr-TR")}
            </Typography>
          </Box>
          <Box>
            <Button>
              <ThumbUpIcon />
            </Button>
            <Button>
              <ThumbDownIcon />
            </Button>
          </Box>
        </Box>
        <Box ref={messagesEndRef}></Box>
      </Paper>
    </>
  );
};

export default CommentCard;
