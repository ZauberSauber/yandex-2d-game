import ButtonManager from './ButtonManager';
import type { EGamePage } from './types';

export default abstract class AbstractGamePage {
  protected buttonManager = new ButtonManager();

  abstract render(ctx: CanvasRenderingContext2D): void;

  onEnter?(): void;

  onExit?(): void;

  handleClick?(x: number, y: number): void;

  changePage?(page: EGamePage): void;
}
