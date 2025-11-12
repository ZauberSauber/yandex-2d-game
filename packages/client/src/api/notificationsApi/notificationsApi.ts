class NotificationsApi {
  public async show(title: string, body?: string) {
    if (this.isSupported() && Notification.permission === 'granted') {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(title, {
        body,
      });
    }
  }

  public async requestPermission() {
    const permission = await Notification.requestPermission();

    if (Notification.permission === 'granted') {
      return true;
    }
    if (Notification.permission === 'denied') {
      alert('Разрешите уведомления в настройках браузера');

      return false;
    }

    return permission === 'granted';
  }

  public isSupported() {
    return 'Notification' in window && 'serviceWorker' in navigator;
  }
}

export const notificationsApi = new NotificationsApi();