import AbstractView from './abstract';
import {MenuItem} from '../const';

const createSiteMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
            <a class="trip-tabs__btn trip-tabs__btn--active" href="#" data-menu-item="${MenuItem.TABLE}">Table</a>
            <a class="trip-tabs__btn" href="#" data-menu-item="${MenuItem.STATS}">Stats</a>
          </nav>`;
};

export default class SiteMenu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate();
  }

  _menuClickHandler(evt) {
    if (evt.target.classList.contains('trip-tabs__btn--active')) {
      return;
    }
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.menuItem);
    this.setMenuActiveItem(evt.target.dataset.menuItem);
  }

  setMenuActiveItem(menuItem) {
    this.getElement()
      .querySelectorAll('.trip-tabs__btn')
      .forEach((item) => item.classList.remove('trip-tabs__btn--active'));

    const activeMenuItem = this.getElement().querySelector(`[data-menu-item="${menuItem}"]`);
    activeMenuItem.classList.add('trip-tabs__btn--active');
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    const menuTabs = this.getElement().querySelectorAll('.trip-tabs__btn');
    menuTabs.forEach((tab) => tab.addEventListener('click', this._menuClickHandler));
  }
}
