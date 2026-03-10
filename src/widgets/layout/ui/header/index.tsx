import { Link } from "react-router";

import { COLORS, ROUTES } from "@shared/constants";

import { LangSwitcher } from "../lang-switcher";
import { Navbar } from "../navbar";
import { ProfileMenu } from "../profile-menu";

export const Header = () => (
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
      to={`/${ROUTES.USERS}`}
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

    <Navbar />

    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 8,
      }}
    >
      <LangSwitcher />

      <ProfileMenu />
    </div>
  </header>
);
