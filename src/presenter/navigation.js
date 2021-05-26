import SiteMenuView from '../view/site-menu';
import {render, RenderPosition} from '../utils/render';

export default class SiteNemu {
  constructor(siteMenuContainer) {
    this._siteMenuContainer = siteMenuContainer;

    this._siteMenuComponent = new SiteMenuView();

    this.setMenuClickHandler = this.setMenuClickHandler.bind(this);
  }

  init() {
    this._renderSiteMenu();
  }

  setMenuClickHandler(callback) {
    this._siteMenuComponent.setMenuClickHandler(callback);
  }

  _renderSiteMenu() {
    render(this._siteMenuContainer, this._siteMenuComponent, RenderPosition.BEFOREEND);
  }
}
