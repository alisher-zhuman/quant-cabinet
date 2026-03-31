import Box from "@mui/material/Box";

import { Header } from "@widgets/layout/ui/header";
import { NotFoundWidget } from "@widgets/not-found";

export const NotFound = () => (
  <Box minHeight="100vh" display="flex" flexDirection="column">
    <Header />
    <NotFoundWidget />
  </Box>
);
