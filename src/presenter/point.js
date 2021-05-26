import FormEditView from '../view/form-edit';
import PointView from '../view/trip-point';
import {render, RenderPosition, replace, remove} from '../utils/render';
import {UserAction, UpdateType, Mode} from '../const';

export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
};


export default class Point {
  constructor(pointContainer, changeData, changeMode) {
    this._pointContainer = pointContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleCloseFormClick = this._handleCloseFormClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new PointView(point);
    this._pointEditComponent = new FormEditView(point);

    this._mode = Mode.DEFAULT;

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    this._pointEditComponent.setEditFormCloseHandler(this._handleCloseFormClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this._pointContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._pointContainer.getElement().contains(prevPointComponent.getElement())) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._pointContainer.getElement().contains(prevPointEditComponent.getElement())) {
      replace(this._pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  setViewState(state) {
    const resetFormState = () => {
      this._tripEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    switch (state) {
      case State.SAVING:
        this._tripEditComponent.updateData({
          isDisabled: true,
          isSaving: true
        });
        break;
      case State.DELETING:
        this._tripEditComponent.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case State.ABORTING:
        this._tripComponent.shake(resetFormState);
        this._tripEditComponent.shake(resetFormState);
        break;
    }
  }

  _replacePointToForm() {
    replace(this._pointEditComponent, this._pointComponent);

    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._pointEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._pointEditComponent.reset(this._point);
      this._replaceFormToPoint();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _handleEditClick() {
    if (this._mode === Mode.EDITING) {
      this._replaceFormToPoint();
      this._pointEditComponent.reset(this._point);
    } this._replacePointToForm();
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._point,
        {
          isFavorite: !this._point.isFavorite,
        },
      ),
    );
  }

  _handleFormSubmit(point) {
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point,
    );
    this._replaceFormToPoint();
  }

  _handleDeleteClick(point) {
    this._changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  }

  _handleCloseFormClick() {
    this._pointEditComponent.reset(this._point);
    this._replaceFormToPoint();
  }
}
