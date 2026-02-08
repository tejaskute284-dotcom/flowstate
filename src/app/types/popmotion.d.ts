declare module 'popmotion' {
    export interface PlaybackControls {
        stop: () => void;
    }

    export interface AnimationOptions<V> {
        from: V;
        to: V;
        type?: 'spring' | 'decay' | 'keyframes';
        stiffness?: number;
        damping?: number;
        mass?: number;
        velocity?: number;
        power?: number;
        timeConstant?: number;
        restDelta?: number;
        restSpeed?: number;
        onUpdate?: (latest: V) => void;
        onComplete?: () => void;
        onStop?: () => void;
    }

    export function animate<V>(options: AnimationOptions<V>): PlaybackControls;

    // Keep the old exports for compatibility where they might still be used,
    // but the implementation plan shifts to using `animate`.
    export function spring(options: any): any;
    export function decay(options: any): any;
}

