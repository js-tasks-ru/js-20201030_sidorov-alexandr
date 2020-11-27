class Tooltip {
  static instance;

  constructor() {
    if (!Tooltip.instance) {
      Tooltip.instance = this;
    }
    return Tooltip.instance;
  }

  render(message) {
    this.element = document.createElement('div');
    this.element.className = 'tooltip';
    this.element.innerHTML = message;
    document.body.append(this.element);
  }

  onPointerOver = event => {
    const targetElement = event.target.closest('[data-tooltip]');

    if (targetElement) {
      const message = targetElement.dataset.tooltip;
      this.render(message);
      this.move(event);
      document.addEventListener('pointermove', this.onPointerMove);
    }
  }

  onPointerMove = event => {
    this.move(event);
  }

  onPointerOut = () => {
    this.remove();
  }

  move(event) {
    this.element.style.left = `${(event.clientX + 10)}px`;
    this.element.style.top = `${(event.clientY + 10)}px`;
  }

  initEventListeners() {
    document.addEventListener('pointerover', this.onPointerOver);
    document.addEventListener('pointerout', this.onPointerOut);
  }

  initialize() {
    this.initEventListeners();
  }

  remove() {
    if (this.element) {
      this.element.remove();
      this.element = null;
      document.removeEventListener('pointermove', this.onPointerMove);
    }

  }

  destroy() {
    this.remove();
    document.removeEventListener('pointerover', this.onPointerOver);
    document.removeEventListener('pointerout', this.onPointerOut);
  }

}

const tooltip = new Tooltip();

export default tooltip;
