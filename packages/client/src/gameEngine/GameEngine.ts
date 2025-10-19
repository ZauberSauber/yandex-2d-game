import { END_COLOR, EXP_PER_CYCLE, FRAME_INTERVAL, START_COLOR } from './constants';
import { SKILLS } from './constants/skills';
import { ESkillName } from './types';
import { getProgressColor } from './utils/getProgressColor';
import type { TSkill } from './types';

/* todo:
 * получение ресурсов и банк
 * настроить время получения опыта
 * анимировать фон заняий
 */
export default class GameEngine {
  private canvas: HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D | null = null;

  private currentScale = 0;

  private animationId: number | null = null;

  private lastFrameTime = 0;

  private isAnimating = false;

  private isPaused = true;

  private pageSkill: TSkill = SKILLS.hacking;

  private activeSkillKeyName: ESkillName | null = null;

  private page: ESkillName = ESkillName.hacking;

  constructor() {
    this.canvas = document.getElementById('game') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');

    this.setupEventListeners();
    this.drawPage();
  }

  private setupEventListeners(): void {
    const menu = document.getElementById('menu') as HTMLDivElement;

    if (!menu) {
      return console.error('Menu element not found');
    }

    menu.addEventListener('click', (e) => {
      const target = e.target as HTMLButtonElement;
      if (target.classList.contains('btn-simple')) {
        this.page = target.dataset.skill as ESkillName;
        this.pageSkill = SKILLS[this.page as keyof typeof SKILLS];
        this.handleMenuClick();
      }

      if (!this.pageSkill) {
        return console.error('Active skill not set');
      }

      if (target.classList.contains('btn-play')) {
        this.isPaused = !this.isPaused;

        if (this.isPaused) {
          this.currentScale = 0;
          SKILLS[this.activeSkillKeyName as ESkillName].isActive = false;
          this.activeSkillKeyName = null;
          this.destroy();
          this.drawPage();
        } else {
          this.activeSkillKeyName = this.page;
          SKILLS[this.activeSkillKeyName as ESkillName].isActive = true;
          this.startAnimation();
        }
      }
    });
  }

  private handleMenuClick(): void {
    this.drawPage();
  }

  private startAnimation(): void {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.animatePage();
  }

  private calculateProgress(): void {
    if (this.isPaused) {
      return;
    }

    if (!this.activeSkillKeyName) {
      return;
    }

    // скорость получения опыта
    this.currentScale += 42;

    if (this.currentScale >= SKILLS[this.activeSkillKeyName].timeTogetExp) {
      SKILLS[this.activeSkillKeyName].exp += EXP_PER_CYCLE;

      if (SKILLS[this.activeSkillKeyName].exp >= SKILLS[this.activeSkillKeyName].expToLvl) {
        SKILLS[this.activeSkillKeyName].lvl += 1;
        SKILLS[this.activeSkillKeyName].exp = 0;
      }

      this.currentScale = 0;
    }
  }

  private drawPage(): void {
    if (!this.ctx) {
      return console.error('Canvas context not available');
    }

    // Очистка canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Фон
    this.ctx.fillStyle = '#ffffffaf';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.calculateProgress();

    const skillProgress = this.pageSkill.isActive ? this.currentScale : 0;

    this.drawActionProgress(skillProgress, this.pageSkill?.timeTogetExp || 0);
    this.drawAction();
  }

  private animatePage = (currenetTime = 0): void => {
    const deeltaTime = currenetTime - this.lastFrameTime;

    if (deeltaTime >= FRAME_INTERVAL) {
      this.lastFrameTime = currenetTime;
      this.drawPage();
    }

    this.animationId = requestAnimationFrame(this.animatePage);
  };

  private drawAction(): void {
    if (!this.ctx) {
      return;
    }

    const posY = 20;

    this.ctx.fillStyle = '#000';
    this.ctx.font = '14px Arial';
    this.ctx.textAlign = 'center';
    const text = `${this.pageSkill?.name || ''} ур. ${this.pageSkill?.lvl || ''}`;
    this.ctx.fillText(text, this.canvas.width / 2, posY);

    this.drawBar(
      15,
      posY + 10,
      this.canvas.width - 30,
      20,
      this.pageSkill?.exp || 0,
      this.pageSkill?.expToLvl || 0
    );
  }

  private drawBar(
    posX: number,
    posY: number,
    width: number,
    height: number,
    value: number,
    maxValue: number
  ): void {
    if (!this.ctx) {
      return;
    }

    this.ctx.save();

    // Фон шкалы
    this.ctx.fillStyle = '#f0f0f0';
    this.ctx.fillRect(posX, posY, width, height);

    // Заполненная часть
    const progressWidth = (value / maxValue) * width;
    const currenColor = getProgressColor(START_COLOR, END_COLOR, value / maxValue);
    this.ctx.shadowColor = currenColor;
    this.ctx.shadowBlur = 20;
    this.ctx.shadowOffsetX = 0; // No horizontal offset for the shadow
    this.ctx.shadowOffsetY = 0; // No vertical offset for the shadow
    this.ctx.fillStyle = currenColor;
    this.ctx.fillRect(posX, posY, progressWidth, height);

    this.ctx.restore();
  }

  private drawActionProgress(value: number, maxValue: number): void {
    if (!this.ctx) {
      return;
    }

    const width = this.canvas.width;
    const height = 40;
    const posX = 0;
    const posY = this.canvas.height - height;

    this.drawBar(posX, posY, width, height, value, maxValue);

    // Граница
    this.ctx.strokeStyle = 'rgba(138, 43, 226, 1)';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(posX, posY, width, height);

    // Текст
    this.ctx.fillStyle = '#000';
    this.ctx.font = '14px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`Текущее значение: ${value.toFixed(0)}`, width / 2, posY - 10);
  }

  public destroy(): void {
    if (this.animationId) {
      this.isAnimating = false;
      cancelAnimationFrame(this.animationId);
    }
  }
}
