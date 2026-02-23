import { LangSwitcher } from "@shared/ui/lang-switcher";

export const Header = () => {
  return (
    <header style={{ display: "flex", alignItems: "center", padding: 16 }}>
      <img
        src="/images/logo.png"
        alt="Logo"
        style={{
          width: 70,
        }}
      />

      <LangSwitcher />
    </header>
  );
};
