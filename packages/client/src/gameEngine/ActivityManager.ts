import type { TActivity } from './types';

export default class ActivityManager {
  private static _instance: ActivityManager | null = null;

  private currentTime = 0;

  private activities: Map<string, TActivity> = new Map();

  constructor() {
    if (ActivityManager._instance) {
      return ActivityManager._instance;
    }

    ActivityManager._instance = this;
  }

  static getInstance(): ActivityManager {
    if (!ActivityManager._instance) {
      throw new Error('Инстанс ActivityManager не создан!');
    }

    return ActivityManager._instance;
  }

  getActivityState(name: string): Pick<TActivity, 'progress' | 'isComplete' | 'isRunning'> | null {
    const activity = this.activities.get(name);

    return activity
      ? {
          progress: activity.progress,
          isComplete: activity.isComplete,
          isRunning: activity.isRunning,
        }
      : null;
  }

  startActivity(name: string, duration: number, onComplete?: () => void) {
    this.activities.set(name, {
      startTime: this.currentTime,
      duration,
      progress: 0,
      isComplete: false,
      isRunning: true,
      onComplete,
    });
  }

  stopActivity(name: string) {
    if (this.activities.has(name)) {
      this.activities.delete(name);
    }
  }

  update(currentTime: number) {
    this.currentTime = currentTime;

    this.activities.forEach((activity, name) => {
      const lastTime = this.activities.get(name)?.startTime || 0;
      const deltaTime = currentTime - lastTime;

      activity.progress = Math.min(deltaTime, activity.duration);

      if (deltaTime >= activity.duration) {
        if (!activity.isComplete) {
          activity.isComplete = true;
          activity.isRunning = false;
          activity.onComplete?.();
        }
      }
    });
  }
}
