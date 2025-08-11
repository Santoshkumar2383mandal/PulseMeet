import {create} from "zustand";
// to use zustand as a globle object

export const useThemeStore = create((set) => ({
    theme : localStorage.getItem("current-theme") || "coffee",
    setTheme: (theme) => {
        localStorage.setItem("current-theme", theme);
        set({theme});
    },
}))