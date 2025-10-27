import { FRAME_INTERVAL } from './constants';
import PageManager from './PageManager';
import BattlePage from './pages/BattlePage';
import CharacterPage from './pages/CharacterPage';
import FactoryPage from './pages/FactoryPage';
import InventoryPage from './pages/InventoryPage';
import RaidsPage from './pages/RaidsPage';
import SkillsPage from './pages/SkillsPage';
import { EGamePage } from './types';

import styles from '@pages/game/Game.module.scss';

/* todo:
 * получение ресурсов и банк
 * настроить время получения опыта
 * анимировать фон заняий
 */

type TGameEngine = {
  containerId: string;
  onResourceUpdate: () => void;
  onGameOver: () => void;
};

export default class GameEngine {
  private canvas: HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D;

  private animationId: number | null = null;

  private lastFrameTime = 0;

  private isAnimating = false;

  private pageManager: PageManager;

  private onGameOver: () => void;

  private onResourceUpdate: () => void;

  constructor({ containerId = 'game', onGameOver, onResourceUpdate }: TGameEngine) {
    const gameContainer = document.getElementById(containerId);

    if (!gameContainer) {
      throw new Error(`Не найден контейнер с id: ${containerId}`);
    }

    this.onGameOver = onGameOver;
    this.onResourceUpdate = onResourceUpdate;

    this.canvas = this.createCanvas(gameContainer);
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.pageManager = new PageManager(this.canvas, this.ctx);
    this.setupPages();

    this.startRendering();
  }

  private createCanvas(gameContainer: HTMLElement): HTMLCanvasElement {
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    canvas.classList.add(styles.gameCanvas);
    canvas.width = 800;
    canvas.height = 600;

    gameContainer.innerHTML = '';
    gameContainer.appendChild(canvas);

    return canvas;
  }

  private setupPages(): void {
    this.pageManager.registerPage(EGamePage.character, new CharacterPage());
    this.pageManager.registerPage(EGamePage.factory, new FactoryPage());
    this.pageManager.registerPage(EGamePage.inventory, new InventoryPage());
    this.pageManager.registerPage(EGamePage.raids, new RaidsPage());
    this.pageManager.registerPage(EGamePage.skills, new SkillsPage());
    this.pageManager.registerPage(EGamePage.battle, new BattlePage());

    // Стартовая страница
    this.pageManager.setPage(EGamePage.raids);
  }

  private startRendering(): void {
    if (this.isAnimating) return;

    this.isAnimating = true;

    this.destroy();

    const renderLoop = (currenetTime = 0) => {
      const deltaTime = currenetTime - this.lastFrameTime;

      if (deltaTime >= FRAME_INTERVAL) {
        this.lastFrameTime = currenetTime;

        this.pageManager.render();
      }

      this.animationId = requestAnimationFrame(renderLoop);
    };

    renderLoop();
  }

  // @ts-expect-error использовать для сохранения в бд
  private endGame(): void {
    this.onGameOver();
  }

  // @ts-expect-error использовать для сохранения в бд
  private updateResource(): void {
    this.onResourceUpdate();
  }

  public destroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}
