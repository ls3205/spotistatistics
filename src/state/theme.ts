import { create } from 'zustand'

interface themeState {
    theme: 'system' | 'light' | 'dark'
    setTheme: (theme: 'system' | 'light' | 'dark') => void
}

export const useTheme = create<themeState>()((set) => ({
    theme: 'system',
    setTheme: (theme: 'system' | 'light' | 'dark') => set({ theme })
}));