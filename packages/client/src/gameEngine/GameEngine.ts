import ActivityManager from './ActivityManager';
import { FRAME_INTERVAL } from './constants';
import PageManager from './PageManager';
import BattlePage from './pages/BattlePage';
import CharacterPage from './pages/CharacterPage';
import FactoryPage from './pages/FactoryPage';
import InventoryPage from './pages/InventoryPage';
import RaidsPage from './pages/RaidsPage';
import SkillsPage from './pages/SkillsPage';
import PlayerManager from './PlayerManager';
import { EGamePage } from './types';

import styles from '@pages/game/Game.module.scss';

/* todo:
 * бой: сделать выбор активного навыка и получение опыта для него
 * бой: сделать получение рессурсов
 * бой: добавить логику использования аптечек
 * страница инвентаря: отображение списка ресурсов (использовать контейнер поверх канваса)
 * страница навыков: вывод актуального состояния навыков
 * производство: реализовать логику крафта, скрафченные вещи надевать автоматом, настроить отображение на странице персонажа
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

  private activutyManager: ActivityManager;

  private pageManager: PageManager;

  private playerManager: PlayerManager;

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

    this.activutyManager = new ActivityManager();
    this.playerManager = new PlayerManager();
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

        this.activutyManager.update(currenetTime);
        this.playerManager.update(currenetTime);

        if (this.playerManager.getHP() <= 0) {
          this.endGame();
          return;
        }

        this.pageManager.render();
      }

      this.animationId = requestAnimationFrame(renderLoop);
    };

    renderLoop();
  }

  private endGame(): void {
    if (this.isAnimating) {
      this.isAnimating = false;
      this.destroy();
    }

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
