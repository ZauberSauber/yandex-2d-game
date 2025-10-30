import type { TButton } from './types';

export default class ButtonManager<T extends string> {
  private buttons: Map<string, TButton<T>> = new Map();

  addButton(button: TButton<T> | TButton<T>[]): void {
    if (Array.isArray(button)) {
      button.forEach((b) => {
        this.buttons.set(b.name, b);
      });
      return;
    }

    this.buttons.set(button.name, button);
  }

  getButtons(): TButton<T>[] {
    return Array.from(this.buttons.values());
  }

  getButtonIndex(x: number, y: number): number {
    const buttons = this.getButtons();

    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];

      if (
        x >= button.x &&
        x < button.x + button.width &&
        y >= button.y &&
        y < button.y + button.height
      ) {
        return i;
      }
    }

    return -1;
  }

  getButtonName(x: number, y: number): string | undefined {
    for (const [buttonName, button] of this.buttons) {
      if (
        x >= button.x &&
        x < button.x + button.width &&
        y >= button.y &&
        y < button.y + button.height
      ) {
        return buttonName;
      }
    }

    return undefined;
  }

  getButtonByName(name: string): TButton<T> | undefined {
    return this.buttons.get(name);
  }
}
