import { Link, NavLink } from "react-router";

import { useTranslation } from "react-i18next";

import { HEADER_NAVIGATION_ITEMS, ROUTES } from "@shared/constants";
import { LangSwitcher } from "@shared/ui/lang-switcher";

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
      }}
    >
      <Link
        to={`/${ROUTES.USERS}`}
        style={{
          textDecoration: "none",
          color: "#0F172A",
          fontSize: 24,
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: 0.2,
        }}
      >
        Quant Cabinet
      </Link>

      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "#F1F5F9",
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
              color: isActive ? "#2563EB" : "#334155",
              textDecoration: "none",
              fontWeight: 600,
              background: isActive ? "#FFFFFF" : "transparent",
              borderRadius: 8 ,
            })}
          >
            {t(label)}
          </NavLink>
        ))}
      </nav>

      <LangSwitcher />
    </header>
  );
};
