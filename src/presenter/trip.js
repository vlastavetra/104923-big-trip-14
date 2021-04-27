import SortView, {SortType} from '../view/site-sort';
import ListView from '../view/trip-list';
import EmptyTripView from '../view/trip-list-empty';
import TripInfoView from '../view/trip-info';
import PointPresenter from './point';
import {sortByTime, sortByPrice, sortByDate} from '../utils/sort';
import {render, RenderPosition, updateItem} from '../utils/render';

export default class Trip {
  constructor(tripContainer, mainContainer) {
    this._tripContainer = tripContainer;
    this._mainContainer = mainContainer;
    this._pointPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._sortComponent = new SortView();
    this._listComponent = new ListView();
    this._emptyTripComponent = new EmptyTripView();
    this._tripInfoComponent = new TripInfoView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripPoints) {
    this._tripPoints = tripPoints;
    this._sourcedTripPoints = tripPoints;

    this._renderTrip();
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearPointList();
    this._renderList();
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedPoint);
    this._sourcedTripPoints = updateItem(this._sourcedTripPoints, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._tripPoints.sort(sortByTime);
        break;
      case SortType.PRICE:
        this._tripPoints.sort(sortByPrice);
        break;
      default:
        this._tripPoints.sort(sortByDate);
    }

    this._currentSortType = sortType;
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._listComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderList() {
    render(this._tripContainer, this._listComponent, RenderPosition.BEFOREEND);

    this._tripPoints.forEach((point) => {
      this._renderPoint(point);
    });
  }

  _renderEmptyTrip() {
    render(this._tripContainer, this._emptyTripComponent, RenderPosition.BEFOREEND);
  }

  _renderTripInfo() {
    render(this._mainContainer, new TripInfoView(this._tripPoints).getElement(), RenderPosition.AFTERBEGIN);
  }

  _renderTrip() {
    if (this._tripPoints.length === 0) {
      this._renderEmptyTrip();
    } else {
      this._renderSort();
      this._renderTripInfo();
      this._renderList();
    }
  }

  _clearPointList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }
}
