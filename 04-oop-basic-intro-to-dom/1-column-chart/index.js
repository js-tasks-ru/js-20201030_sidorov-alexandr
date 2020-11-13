export default class ColumnChart {
  element;
  chartHeight = 50;

  constructor(params) {
    const {data = [], label = '', link, value = ''} = params ? params : {};
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = value;
    this.render();
    this.initEventListener();
  }

  initEventListener() {
    //not yet implemented
  }

  render() {
    const columnChart = this.createParentElement();
    columnChart.append(this.createTitleElement());
    columnChart.append(this.createChartContainer());
    this.element = columnChart;
  }

  update(data) {
    this.data = data;
    this.element.querySelector('.column-chart__chart').remove();
    this.element.querySelector('.column-chart__container').append(this.createChartContainerBody());
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    //additionally needed to remove all listeners...
  }

  createParentElement() {
    const element = document.createElement('div');
    element.classList.add('column-chart');

    if (this.data.length === 0) {
      element.classList.add('column-chart_loading');
      element.setAttribute('style', '--chart-height: ' + this.chartHeight);
    }

    return element;
  }

  createTitleElement() {
    const titleElement = document.createElement('div');
    titleElement.classList.add('column-chart__title');
    titleElement.append(this.label);

    if (this.link) {
      const linkElement = document.createElement('a');
      linkElement.href = this.link;
      linkElement.classList.add('column-chart__link');
      linkElement.textContent = 'View all';
      titleElement.append(linkElement);
    }

    return titleElement;
  }

  createChartContainerHeader() {
    const containerHeader = document.createElement('div');
    containerHeader.dataset.element = 'header';
    containerHeader.classList.add('column-chart__header');
    containerHeader.textContent = this.value;
    return containerHeader;
  }

  createChartContainerBody() {
    const containerBody = document.createElement('div');
    containerBody.dataset.element = 'body';
    containerBody.classList.add('column-chart__chart');

    this.getColumnProps().forEach(item => {
      const columnElement = document.createElement('div');
      columnElement.setAttribute('style', '--value: ' + item.value);
      columnElement.dataset.tooltip = item.percent;
      containerBody.append(columnElement);
    });

    return containerBody;
  }

  createChartContainer() {
    const containerElement = document.createElement('div');
    containerElement.classList.add('column-chart__container');
    containerElement.append(this.createChartContainerHeader());
    containerElement.append(this.createChartContainerBody());
    return containerElement;
  }

  getColumnProps() {
    const maxValue = Math.max(...this.data);
    const scale = this.chartHeight / maxValue;

    return this.data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }
}
