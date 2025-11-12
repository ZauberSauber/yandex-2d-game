import type { DocumentWithFullscreen, HTMLElementWithFullscreen } from './types';

class FullscreenApi {
  public getFullscreenElement(): Element | null {
    return (
      document.fullscreenElement ||
      (document as DocumentWithFullscreen).webkitFullscreenElement ||
      (document as DocumentWithFullscreen).mozFullScreenElement ||
      (document as DocumentWithFullscreen).msFullscreenElement ||
      null
    );
  }

  public requestFullscreen(element: HTMLElement): Promise<void> {
    if (element.requestFullscreen) {
      return element.requestFullscreen();
    }

    const fullscreenElement = element as HTMLElementWithFullscreen;
    if (fullscreenElement.webkitRequestFullscreen) {
      return fullscreenElement.webkitRequestFullscreen();
    }
    if (fullscreenElement.mozRequestFullScreen) {
      return fullscreenElement.mozRequestFullScreen();
    }
    if (fullscreenElement.msRequestFullscreen) {
      return fullscreenElement.msRequestFullscreen();
    }

    return Promise.reject(new Error('Fullscreen API не поддерживается'));
  }

  public exitFullscreen(): Promise<void> {
    if (document.exitFullscreen) {
      return document.exitFullscreen();
    }

    const fullscreenDocument = document as DocumentWithFullscreen;
    if (fullscreenDocument.webkitExitFullscreen) {
      return fullscreenDocument.webkitExitFullscreen();
    }
    if (fullscreenDocument.mozCancelFullScreen) {
      return fullscreenDocument.mozCancelFullScreen();
    }
    if (fullscreenDocument.msExitFullscreen) {
      return fullscreenDocument.msExitFullscreen();
    }

    return Promise.reject(new Error('Fullscreen API не поддерживается'));
  }

  public getFullscreenChangeEvent(): string {
    if (document.fullscreenElement !== undefined) {
      return 'fullscreenchange';
    }

    const fullscreenDocument = document as DocumentWithFullscreen;
    if (fullscreenDocument.webkitFullscreenElement !== undefined) {
      return 'webkitfullscreenchange';
    }
    if (fullscreenDocument.mozFullScreenElement !== undefined) {
      return 'mozfullscreenchange';
    }
    if (fullscreenDocument.msFullscreenElement !== undefined) {
      return 'MSFullscreenChange';
    }

    return 'fullscreenchange';
  }

  public isSupported(): boolean {
    const element = document.createElement('div');
    return !!(
      element.requestFullscreen ||
      (element as HTMLElementWithFullscreen).webkitRequestFullscreen ||
      (element as HTMLElementWithFullscreen).mozRequestFullScreen ||
      (element as HTMLElementWithFullscreen).msRequestFullscreen
    );
  }

  public toggleFullscreen(element: HTMLElement): Promise<void> {
    return this.getFullscreenElement()
      ? this.exitFullscreen()
      : this.requestFullscreen(element);
  }

  public addChangeListener(callback: () => void): void {
    const eventName = this.getFullscreenChangeEvent();
    document.addEventListener(eventName, callback);
  }

  public removeChangeListener(callback: () => void): void {
    const eventName = this.getFullscreenChangeEvent();
    document.removeEventListener(eventName, callback);
  }
}

export const fullscreenApi = new FullscreenApi();