import SiteMenuView from '../view/site-menu';
import {render, RenderPosition} from '../utils/render';

export default class SiteNemu {
  constructor(siteMenuContainer) {
    this._siteMenuContainer = siteMenuContainer;

    this._siteMenuComponent = new SiteMenuView();
  }

  init() {
    this._renderSiteMenu();
  }

  _renderSiteMenu() {
    render(this._siteMenuContainer, this._siteMenuComponent, RenderPosition.BEFOREEND);
  }
}
