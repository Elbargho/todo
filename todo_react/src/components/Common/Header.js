import { Container, Typography, Divider as MuiDivider } from "@mui/material";

export default function Header({ title, children }) {
  return (
    <>
      <Container maxWidth={false} sx={{ display: "flex" }} disableGutters>
        <Typography variant="h4" sx={{ marginLeft: "23px" }} gutterBottom>
          {title}
        </Typography>
        {children}
      </Container>
      <MuiDivider sx={{ height: "2px", bgcolor: "var(--highlight-color)", marginBottom: "25px" }} />
    </>
  );
}
