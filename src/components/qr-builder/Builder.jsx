import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { CirclePicker } from "react-color";
import QRCode from "qrcode.react";

const Builder = () => {
  const [backgroundColor, setBackgroundColor] = useState();

  const handleChangeComplete = ({ hex }) => {
    setBackgroundColor(hex);
  };

  const downloadQrCode = () => {
    const canvas = document.getElementById("qr-code-canvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <Grid sx={{ mt: 3 }} container spacing={3}>
      <Grid item xl={4} lg={4} sm={6} xs={12}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom variant="overline">
              QR Code Generator
            </Typography>
            <Divider sx={{ my: 3 }} />
            <Typography color="textPrimary" gutterBottom variant="overline">
              Front color
            </Typography>
            <Box mt={3}>
              <CirclePicker
                onChangeComplete={handleChangeComplete}
                color={backgroundColor}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xl={4} lg={4} sm={6} xs={12}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom variant="overline">
              QR Code Generator
            </Typography>
            <Divider sx={{ my: 3 }} />
            <Box mt={3}>
              <QRCode
                id="qr-code-canvas"
                includeMargin
                size={512}
                style={{ height: "100%", width: "100%" }}
                value="https://reactjs.org/belisima/"
                fgColor={backgroundColor}
                level="H"
              />
            </Box>
            <Button onClick={downloadQrCode} type="button" variant="outlined">
              Download QR code
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xl={4} lg={4} sm={6} xs={12}>
        <Card>
          <CardContent>Context</CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Builder;
