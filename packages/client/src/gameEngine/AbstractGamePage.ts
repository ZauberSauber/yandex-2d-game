export default abstract class AbstractGamePage { 
  abstract render(ctx: CanvasRenderingContext2D): void

  onEnter?(): void;

  onExit?(): void;

  handleClick?(x: number, y: number): void;
}
