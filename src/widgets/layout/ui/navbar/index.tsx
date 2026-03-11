import { NavLink } from "react-router";

import { useTranslation } from "react-i18next";

import { COLORS } from "@shared/constants";

import { NAVBAR_LINKS } from "./constants";

export const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 8,
        background: COLORS.neutral[100],
        padding: 4,
        borderRadius: 12,
      }}
    >
      {NAVBAR_LINKS.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          style={({ isActive }) => ({
            padding: "8px 24px",
            color: isActive ? COLORS.primary.main : COLORS.neutral[600],
            textDecoration: "none",
            fontWeight: 600,
            background: isActive ? COLORS.neutral.white : "transparent",
            borderRadius: 8,
          })}
        >
          {t(label)}
        </NavLink>
      ))}
    </nav>
  );
};
