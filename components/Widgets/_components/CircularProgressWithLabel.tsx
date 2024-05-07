import { Box, CircularProgress } from "@mui/material";

interface CircularProgressWithLabelProps {
    open?: boolean;
    value?: number;
};

export default function CircularProgressWithLabel({ open, value }:CircularProgressWithLabelProps) {
    return (
            <Box sx={{ position: "relative", display: "inline-flex" }}>
              <CircularProgress
                variant="determinate"
                value={value}
                size={45}
                color={value && value > 99 ? "info" : "error"}
                thickness={4}
                style={{ zIndex: open ? -1 : 1 }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              ></Box>
            </Box>
    );
}

