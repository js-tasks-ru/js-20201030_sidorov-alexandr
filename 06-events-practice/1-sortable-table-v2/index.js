export default class SortableTable {
  constructor(header = [], {data = []} = {}) {
    this.header = header;
    this.data = data;
    this.render();
    this.sort('title', 'asc');
    this.addEventListeners();
  }

  getHeader() {
    return this.header.map(item => {
      return `<div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}">
                <span>${item.title}</span>
              </div>`;
    }).join('');
  }

  getCells(row) {
    return this.header.map(header => {
      if (header.template) {
        return header.template(row.images);
      } else {
        return `<div class="sortable-table__cell">${row[header.id]}</div>`;
      }
    }).join('');
  }

  getRows() {
    return this.data.map(item => {
      return `<a href="/products/${item.id}" class="sortable-table__row">
                ${this.getCells(item)}
            </a>`;
    }).join('');
  }

  getTemplate() {
    return `
        <div class="sortable-table">
            <div data-element="header" class="sortable-table__header sortable-table__row">
                ${this.getHeader()}
            </div>
            <div data-element="body" class="sortable-table__body">
                ${this.getRows()}
            </div>
            <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
            <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
                <div>
                  <p>No products satisfies your filter criteria</p>
                  <button type="button" class="button-primary-outline">Reset all filters</button>
                </div>
            </div>
        </div>
    `;
  }

  getSubElements(dataElements) {
    return [...dataElements].reduce((accumulator, current) => {
      accumulator[current.dataset.element] = current;
      return accumulator;
    }, {});
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate();

    const arrow = document.createElement('div');
    arrow.innerHTML = `<span data-element="arrow" class="sortable-table__sort-arrow">
                            <span class="sort-arrow"></span>
                       </span>`;

    this.subElements = this.getSubElements(element.querySelectorAll('[data-element]'));
    this.columns = [...this.subElements.header.querySelectorAll('.sortable-table__cell')];
    this.arrow = arrow.firstElementChild;
    this.element = element.firstElementChild;
  }

  addEventListeners() {
    this.subElements.header.addEventListener('pointerdown', event => {
      const column = event.target;

      if (column.dataset.sortable) {
        const order = column.dataset.order ? column.dataset.order : 'asc';
        const obj = {'asc': 'desc', 'desc': 'asc'};
        this.sort(column.dataset.id, obj[order]);
      }
    });
  }

  sort(field, order) {
    const {sortType} = this.header.find(item => item.id === field);
    this.data = this.sortData(this.data, field, sortType, order);
    this.subElements.body.innerHTML = this.getRows();

    const column = this.columns.find(item => item.dataset.id === field);

    column.append(this.arrow);
    column.dataset.order = order;
  }

  sortData(data, field, sortType, order) {
    const arr = [...data];
    const factor = order === 'asc' ? 1 : -1;

    switch (sortType) {
    case 'string':
      return arr.sort((a, b) => factor * a[field].localeCompare(b[field], ['ru', 'en'], {caseFirst: "upper"}));
    default:
      return arr.sort((a, b) => factor * (a[field] - b[field]));
    }
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
