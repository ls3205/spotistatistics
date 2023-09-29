"use client";

import { useTheme } from "@/state/theme";
import React, { useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "./ui/Dropdown";
import { SunMoonIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
    className?: string
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        const themeMode = localStorage.getItem("theme");

        if (themeMode === null) {
            localStorage.setItem("theme", "system");
            setTheme("system");
        }

        if (themeMode === "system") {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                document.documentElement.classList.add("dark");
            }
        } else if (themeMode === "dark") {
            document.documentElement.classList.add("dark");
            setTheme("dark");
        } else {
            document.documentElement.classList.remove("dark");
            setTheme("light");
        }
    }, []);

    useEffect(() => {
        if (theme === "system") {
            localStorage.setItem("theme", "system");
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                document.documentElement.classList.add("dark");
            }
        }

        if (theme === "dark") {
            localStorage.setItem("theme", "dark");
            document.documentElement.classList.add("dark");
        }

        if (theme === "light") {
            localStorage.setItem("theme", "light");
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className={cn('mx-2', className)}>
                <SunMoonIcon className="text-black dark:text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-white bg-neutral-100 text-black dark:border-black dark:bg-neutral-900 dark:text-white">
                {/* @ts-ignore */}
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                    <DropdownMenuRadioItem
                        value="light"
                        className="focus:bg-green-400 dark:focus:bg-green-400"
                    >
                        Light
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                        value="dark"
                        className="focus:bg-green-400 dark:focus:bg-green-400"
                    >
                        Dark
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                        value="system"
                        className="focus:bg-green-400 dark:focus:bg-green-400"
                    >
                        System
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ThemeToggle;
