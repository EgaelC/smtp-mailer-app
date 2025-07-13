import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function App() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState<{ open: boolean; severity: "success" | "error"; message: string }>({
    open: false,
    severity: "success",
    message: "",
  });

  const handleSend = async () => {
    if (!to || !subject || !message) {
      setAlert({ open: true, severity: "error", message: "Por favor llena todos los campos." });
      return;
    }
    try {
      await axios.post("http://localhost:3001/send-email", { to, subject, message });
      setAlert({ open: true, severity: "success", message: "Correo enviado correctamente" });
      setTo("");
      setSubject("");
      setMessage("");
    } catch (error) {
      setAlert({ open: true, severity: "error", message: "Error al enviar el correo" });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f0f4f8",
        p: 2,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          p: 4,
          boxShadow: 3,
          borderRadius: 3,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h4" mb={3} color="primary" fontWeight="bold" textAlign="center">
          Redactar correo
        </Typography>
        <Box display="flex" flexDirection="column" gap={3}>
          <TextField
            label="Destinatario"
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Asunto"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Mensaje"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            multiline
            rows={6}
            required
          />
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSend}
            size="large"
            sx={{ fontWeight: "bold" }}
          >
            Enviar correo
          </Button>
        </Box>

        <Snackbar open={alert.open} autoHideDuration={4000} onClose={handleCloseAlert}>
          <Alert severity={alert.severity} onClose={handleCloseAlert} sx={{ width: "100%" }}>
            {alert.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
