import SortView, {SortType} from '../view/site-sort';
import ListView from '../view/trip-list';
import EmptyTripView from '../view/trip-list-empty';
import PointPresenter from './point';
import NewPointPresenter from './new-point';
import {sortByTime, sortByPrice, sortByDate} from '../utils/sort';
import {render, RenderPosition, remove} from '../utils/render';
import {filter} from '../utils/filter';
import {UserAction, UpdateType, FilterType} from '../const';

export default class Trip {
  constructor(tripContainer, pointsModel, filterModel) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._tripContainer = tripContainer;
    this._pointPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._sortComponent = new SortView();
    this._listComponent = new ListView();
    this._emptyTripComponent = new EmptyTripView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._newPointPresenter = new NewPointPresenter(this._listComponent, this._handleViewAction);
  }

  init() {
    this._renderTrip();
  }

  createPoint() {
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._newPointPresenter.init();
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filteredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.TIME:
        filteredPoints.sort(sortByTime);
        break;
      case SortType.PRICE:
        filteredPoints.sort(sortByPrice);
        break;
      default:
        filteredPoints.sort(sortByDate);
    }

    return filteredPoints;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._currentSortType = SortType.DEFAULT;
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTrip({resetSortType: true});
    this._renderTrip();
  }

  _handleModeChange() {
    this._newPointPresenter.destroy();
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderSort() {

    this._sortComponent = new SortView(this._currentSortType);

    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);

    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._listComponent, this._handleViewAction, this._handleModeChange);

    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderList() {
    render(this._tripContainer, this._listComponent, RenderPosition.BEFOREEND);

    this._getPoints().forEach((point) => {
      this._renderPoint(point);
    });
  }

  _renderEmptyTrip() {
    render(this._tripContainer, this._emptyTripComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    if (this._getPoints().length === 0) {
      this._renderEmptyTrip();
    } else {
      this._renderSort();
      this._renderList();
    }
  }

  _clearTrip(resetSortType = false) {
    this._newPointPresenter.destroy();

    remove(this._emptyTripComponent);

    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    if (resetSortType) {
      remove(this._sortComponent);
    }
  }
}
