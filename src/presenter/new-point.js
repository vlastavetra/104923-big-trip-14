import FormEditView from '../view/form-edit';
import {nanoid} from 'nanoid';
import {remove, render, RenderPosition} from '../utils/render';
import {UserAction, UpdateType} from '../const';

export default class NewPoint {
  constructor(tripContainer, changeData) {
    this._tripContainer = tripContainer;
    this._changeData = changeData;

    this._tripEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleCloseFormClick = this._handleCloseFormClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._tripEditComponent !== null) {
      return;
    }

    this._tripEditComponent = new FormEditView();
    this._tripEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._tripEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._tripContainer, this._tripEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._tripEditComponent === null) {
      return;
    }

    remove(this._tripEditComponent);
    this._tripEditComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  setSaving() {
    this._tripEditComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._tripEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._tripEditComponent.shake(resetFormState);
  }


  _handleFormSubmit(point) {
    this._changeData(
      UserAction.ADD_TASK,
      UpdateType.MINOR,
      Object.assign({id: nanoid()}, point),
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }

  _handleCloseFormClick() {
    this.destroy();
  }
}
