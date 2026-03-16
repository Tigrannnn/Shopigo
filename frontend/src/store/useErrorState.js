import { create } from "zustand";

let errorTimeout = null;

export const useErrorState = create((set) => ({
    error: '',
    
    setError: (errorText, duration = 4000) => {
        if (errorTimeout) {
            clearTimeout(errorTimeout);
        }

        set({ error: errorText });

        if (errorText) {
            errorTimeout = setTimeout(() => {
                set({ error: '' });
                errorTimeout = null;
            }, duration);
        }
    },

    clearError: () => {
        if (errorTimeout) clearTimeout(errorTimeout);
        set({ error: '' });
    }
}));