class NotificationManager {
  static requestPermission(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (Notification.permission == "granted") return resolve(true);

      const result = await Notification.requestPermission();

      if (result === "granted") resolve(true);

      resolve(false);
    });
  }

  static send(title: string, options: NotificationOptions) {
    const response = new Notification(title, options);
  }
}

export default NotificationManager;
