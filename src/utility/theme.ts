// utils/getInitialThemeClass.ts
export function getInitialThemeClass(): string {
  try {
    const global =
      typeof window !== "undefined"
        ? localStorage.getItem("persist:global")
        : null;
    const theme = global && JSON.parse(JSON.parse(global).theme)?.mode;
    return theme === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}
