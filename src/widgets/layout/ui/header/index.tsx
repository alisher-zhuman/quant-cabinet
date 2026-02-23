import { Link } from "react-router";

import { ROUTES } from "@shared/constants";
import { HeaderNavigation } from "@shared/ui/header-navigation";
import { LangSwitcher } from "@shared/ui/lang-switcher";
import { ProfileMenu } from "@shared/ui/profile-menu";

export const Header = () => {
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

      <HeaderNavigation />

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <LangSwitcher />

        <ProfileMenu />
      </div>
    </header>
  );
};
