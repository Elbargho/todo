import { Divider as MuiDivider, Container } from "@mui/material";

export default function Divider() {
  return (
    <Container maxWidth={false}>
      <MuiDivider sx={{ bgcolor: "var(--main-divider-color)" }} />
    </Container>
  );
}
