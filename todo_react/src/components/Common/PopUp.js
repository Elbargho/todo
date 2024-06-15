import { Alert, Container } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export function PopUp() {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleAlert = (e) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setType(e.detail.type);
      setMessage(e.detail.message);
      setVisible(true);
      timeoutRef.current = setTimeout(() => {
        setVisible(false);
      }, 5000);
    };

    document.addEventListener("alert", handleAlert);

    return () => {
      document.removeEventListener("alert", handleAlert);
    };
  }, []);

  return (
    <Container
      sx={{
        width: "100%",
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        marginTop: "12px",
        transition: "opacity 0.3s ease",
        opacity: visible ? 1 : 0,
      }}
      maxWidth={false}
      disableGutters
    >
      <Alert
        variant="filled"
        severity={type}
        sx={{ bgcolor: `${type}.dark`, width: "fit-content", padding: "0px 10px 0px 8px" }}
      >
        {message}
      </Alert>
    </Container>
  );
}

export function showPopUp(type, message) {
  const alertEvent = new CustomEvent("alert", {
    detail: { type: type, message: message },
  });
  document.dispatchEvent(alertEvent);
}
