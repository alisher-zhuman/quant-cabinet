import { NavLink } from "react-router";

import { useTranslation } from "react-i18next";

import { COLORS, HEADER_NAVIGATION_ITEMS } from "@shared/constants";

export const HeaderNavigation = () => {
  const { t } = useTranslation();

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: COLORS.neutral[100],
        padding: 4,
        borderRadius: 12,
      }}
    >
      {HEADER_NAVIGATION_ITEMS.map(({ to, label }) => (
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
