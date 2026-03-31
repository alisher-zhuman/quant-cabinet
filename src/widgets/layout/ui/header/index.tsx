import { Link } from "react-router";

import { COLORS, ROUTES } from "@shared/constants";
import { useAuthStore } from "@shared/stores";
import { LangSwitcher } from "@shared/ui/lang-switcher";

import { Navbar } from "../navbar";
import { ProfileMenu } from "../profile-menu";

export const Header = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const role = useAuthStore((state) => state.role);

  const canShowPrivateHeader = Boolean(accessToken && role === "admin");

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 8,
        padding: 16,
      }}
    >
      <Link
        to={`/${ROUTES.COMPANIES}`}
        style={{
          textDecoration: "none",
          color: COLORS.neutral[900],
          fontSize: 24,
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: 0.2,
        }}
      >
        Quant Cabinet
      </Link>

      {canShowPrivateHeader && <Navbar />}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <LangSwitcher />

        {canShowPrivateHeader && <ProfileMenu />}
      </div>
    </header>
  );
};
