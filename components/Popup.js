class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector(".popup__close");
  }
  // Method to handle the Escape key press to close the popup
  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      const popupEl = document.querySelector(".popup_visible");
      if (popupEl) {
        this.close();
      }
    }
  }

  // Method to open the popup
  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keyup", this._handleEscapeClose);
  }
  // Function to handle closing the popup when the Escape key is pressed
  close() {
    this._popupElement.classList.remove("popup_visible");
    document.removeEventListener("keyup", this._handleEscapeClose);
  }

  // Method to set event listeners for the popup
  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (
        evt.target === this._popupElement ||
        evt.target === this._popupCloseBtn
      ) {
        this.close();
      }
    });
  }
}

export default Popup;
