import { EXP_PER_CYCLE, PROGRESS_SPEED } from "./constants";
import { SKILLS } from "./constants/skills";
import type { ESkillName } from "./types";

export default class ActivityManager {
  private currentScale = 0;

  private isPaused = false;

  private activeSkillKeyName: ESkillName | null = null;
  
  // @ts-expect-error заиспользовать при напсании логики получения опыта
  private calculateProgress(): void {
    if (this.isPaused) {
      return;
    }

    if (!this.activeSkillKeyName) {
      return;
    }

    // скорость получения опыта
    this.currentScale += PROGRESS_SPEED;

    if (this.currentScale >= SKILLS[this.activeSkillKeyName].timeToGetExp) {
      SKILLS[this.activeSkillKeyName].exp += EXP_PER_CYCLE;

      if (SKILLS[this.activeSkillKeyName].exp >= SKILLS[this.activeSkillKeyName].expToLvl) {
        SKILLS[this.activeSkillKeyName].lvl += 1;
        SKILLS[this.activeSkillKeyName].exp = 0;
      }

      this.currentScale = 0;
    }
  }
}
