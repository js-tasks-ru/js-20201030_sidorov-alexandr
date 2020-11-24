export default class NotificationMessage {
  static instance;

  constructor(message, {duration = 2000, type = 'success'} = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    if (NotificationMessage.instance) {
      NotificationMessage.instance.remove();
    }

    this.render();
  }

  getTemplate() {
    return `<div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
                <div class="timer"></div>
                <div class="inner-wrapper">
                   <div class="notification-header">Notification</div>
                   <div class="notification-body">${this.message}</div>
                </div>
            </div>`;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate();
    this.element = element.firstElementChild;
    NotificationMessage.instance = this.element;
  }

  show(targetElement = document.body) {
    targetElement.append(this.element);
    setTimeout(() => this.remove(), this.duration);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    NotificationMessage.instance = null;
  }
}
