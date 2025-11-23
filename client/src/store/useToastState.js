// useToastState.js
import { create } from 'zustand'

let timeoutId = null;

export const useToastState = create((set) => ({
    isToastShow: false,
    message: '',
    toastDelete: false,
    product: null,
    undoCallback: null,

    toast: (message, toastDelete = false, product = null, undoCallback = null) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }

        set({
            isToastShow: true,
            message,
            toastDelete,
            product,
            undoCallback
        });

        timeoutId = setTimeout(() => {
            set({ isToastShow: false, undoCallback: null });
            timeoutId = null;
        }, 2000);
    },

    cancelAction: () => {
        const state = useToastState.getState();
        if (state.undoCallback) {
            state.undoCallback();
        }
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        set({ isToastShow: false, undoCallback: null });
    },
}));
