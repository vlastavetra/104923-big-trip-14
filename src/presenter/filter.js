import FiltersView from '../view/site-filters.js';
import {render, RenderPosition} from '../utils/render.js';

export default class Filter {
  constructor(filterContainer) {
    this._filterContainer = filterContainer;

    this._filterComponent = new FiltersView();
  }

  init() {
    this._renderFilter();
  }

  _renderFilter() {
    render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
  }
}
