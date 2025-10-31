import { GAME_PAGES } from './constants';
import SideMenu from './SideMenu';
import type AbstractGamePage from './AbstractGamePage';
import type { EGamePage } from './types';

export default class PageManager {
  private pages: Map<string, AbstractGamePage> = new Map();

  public currentPage: AbstractGamePage | null = null;

  public sideMenu: SideMenu | null = null;

  constructor(
    public canvas: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D
  ) {
    this.sideMenu = new SideMenu(this);
    this.setupEventListeners();
  }

  registerPage(name: EGamePage, page: AbstractGamePage): void {
    page.changePage = (pageName) => {
      this.setPage(pageName);
    };

    this.pages.set(name, page);

    if (!GAME_PAGES[name].isNotNav) {
      this.sideMenu?.addMenuItem(name);
    }
  }

  setPage(name: EGamePage): void {
    const newPage = this.pages.get(name);

    if (!newPage) {
      throw new Error(`Page '${name}' not found`);
    }

    if (this.currentPage === newPage) {
      return;
    }

    if (this.currentPage?.onExit) {
      this.currentPage.onExit();
    }

    this.currentPage = newPage;

    if (this.currentPage.onEnter) {
      this.currentPage.onEnter();
    }
  }

  getPages(): Map<string, AbstractGamePage> {
    return this.pages;
  }

  public render(): void {
    if (!this.currentPage) {
      return;
    }

    // Рендер текущей страницы
    this.currentPage.render(this.ctx);

    // Рендер меню поверх страницы
    this.sideMenu?.render(this.ctx);
  }

  private setupEventListeners(): void {
    this.canvas.addEventListener('mousemove', (event) => {
      this.sideMenu?.updateHover(event.offsetX, event.offsetY);
    });

    this.canvas.addEventListener('click', (event) => {
      this.sideMenu?.handleClick(event.offsetX, event.offsetY);

      if (this.currentPage?.handleClick) {
        this.currentPage.handleClick(event.offsetX, event.offsetY);
      }
    });
  }
}
