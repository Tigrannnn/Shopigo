import { create } from 'zustand'

export const useFeedbackState = create((set) => ({
    feedback: 'reviews',
    setFeedback: (feedback) => set({ feedback }),
}))