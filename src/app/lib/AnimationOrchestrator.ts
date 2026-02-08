import { animate } from "motion";
import { createTimeline } from "animejs";
import gsap from "gsap";


/**
 * AnimationOrchestrator
 * Central controller for coordinating animations across different libraries.
 * Handles performance optimization, sequencing, and hardware acceleration.
 */
class AnimationOrchestrator {
  private reducedMotion = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
    }
  }

  /**
   * Sequence multiple animations with dependency tracking
   * @param animations Array of animation objects with id, function, and optional dependencies
   */
  async sequence(
    animations: { id: string; fn: () => Promise<void>; deps?: string[] }[]
  ) {
    if (this.reducedMotion) {
      // Execute all without delay if reduced motion is on
      await Promise.all(animations.map(a => a.fn()));
      return;
    }

    const completed = new Set<string>();

    for (const anim of animations) {
      if (anim.deps) {
        // Wait for all dependencies to complete
        await Promise.all(
          anim.deps.map(dep => this.waitFor(dep, completed))
        );
      }

      await anim.fn();
      completed.add(anim.id);
    }
  }

  private async waitFor(id: string, completed: Set<string>): Promise<void> {
    if (completed.has(id)) return;
    return new Promise(resolve => {
      const check = () => {
        if (completed.has(id)) resolve();
        else requestAnimationFrame(check);
      };
      check();
    });
  }

  /**
   * GPU-optimized spring animation using Motion.dev (WAAPI)
   */
  springTo(element: HTMLElement, props: any, options = {}) {
    if (this.reducedMotion) {
      Object.assign(element.style, props);
      return;
    }

    element.style.willChange = 'transform, opacity';
    return animate(element, props, {
      type: "spring",
      stiffness: 400,
      damping: 30,
      ...options
    });
  }

  /**
   * Clean up hardware acceleration hints to free GPU memory
   */
  cleanup(element: HTMLElement) {
    element.style.willChange = 'auto';
  }

  /**
   * Checks if reduced motion is preferred
   */
  isReducedMotion() {
    return this.reducedMotion;
  }
}

export const orchestrator = new AnimationOrchestrator();
