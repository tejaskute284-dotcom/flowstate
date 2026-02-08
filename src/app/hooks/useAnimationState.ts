import { create } from 'zustand';

interface AnimationStore {
    isPageTransitioning: boolean;
    activeAnimations: Set<string>;
    reducedMotion: boolean;
    setPageTransitioning: (value: boolean) => void;
    registerAnimation: (id: string) => void;
    unregisterAnimation: (id: string) => void;
    setReducedMotion: (value: boolean) => void;
}

export const useAnimationState = create<AnimationStore>((set) => ({
    isPageTransitioning: false,
    activeAnimations: new Set(),
    reducedMotion: typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false,

    setPageTransitioning: (value) => set({ isPageTransitioning: value }),

    registerAnimation: (id) => set((state) => {
        const next = new Set(state.activeAnimations);
        next.add(id);
        return { activeAnimations: next };
    }),

    unregisterAnimation: (id) => set((state) => {
        const next = new Set(state.activeAnimations);
        next.delete(id);
        return { activeAnimations: next };
    }),

    setReducedMotion: (value) => set({ reducedMotion: value })
}));
