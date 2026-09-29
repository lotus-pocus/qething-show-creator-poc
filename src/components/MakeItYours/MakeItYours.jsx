import { useRef } from "react";
import "./MakeItYours.css";

const MAX_TITLE_LENGTH = 50;

function MakeItYours({ value, onChange }) {
  const fileInputRef = useRef(null);

  const personalisation = {
    title: "",
    imageUrl: "",
    imageName: "",
    ...(value && typeof value === "object" ? value : {}),
  };

  function updatePersonalisation(changes) {
    onChange({
      ...personalisation,
      ...changes,
    });
  }

  function handleTitleChange(event) {
    updatePersonalisation({
      title: event.target.value,
    });
  }

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      updatePersonalisation({
        imageUrl: reader.result,
        imageName: file.name,
      });
    };

    reader.readAsDataURL(file);
  }

  function removeImage() {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    updatePersonalisation({
      imageUrl: "",
      imageName: "",
    });
  }

  return (
    <div className="make-it-yours">
      <div className="make-it-yours__field">
        <div className="make-it-yours__label-row">
          <label
            className="make-it-yours__label"
            htmlFor="make-it-yours-title"
          >
            Show name
          </label>

          <span className="make-it-yours__optional">Optional</span>
        </div>

        <div className="make-it-yours__input-wrap">
          <input
            id="make-it-yours-title"
            className="make-it-yours__input"
            type="text"
            value={personalisation.title}
            placeholder="e.g. Linda's Last Hurrah"
            maxLength={MAX_TITLE_LENGTH}
            onChange={handleTitleChange}
          />

          <span className="make-it-yours__count">
            {personalisation.title.length}/{MAX_TITLE_LENGTH}
          </span>
        </div>
      </div>

      <div className="make-it-yours__field">
        <div className="make-it-yours__label-row">
          <span className="make-it-yours__label">Show image</span>

          <span className="make-it-yours__optional">Optional</span>
        </div>

        <input
          ref={fileInputRef}
          className="make-it-yours__file-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {!personalisation.imageUrl ? (
          <button
            type="button"
            className="make-it-yours__upload"
            onClick={openFilePicker}
          >
            <span className="make-it-yours__upload-glow" />

            <span
              className="make-it-yours__upload-icon"
              aria-hidden="true"
            >
              📸
            </span>

            <span className="make-it-yours__upload-copy">
              <strong>Add a photo</strong>
              <small>Give your show its own cover</small>
            </span>

            <span
              className="make-it-yours__upload-plus"
              aria-hidden="true"
            >
              +
            </span>
          </button>
        ) : (
          <div className="make-it-yours__preview">
            <img
              className="make-it-yours__preview-image"
              src={personalisation.imageUrl}
              alt="Your show"
            />

            <div className="make-it-yours__preview-shade" />

            <div className="make-it-yours__preview-badge">
              <span aria-hidden="true">✨</span>
              Your show
            </div>

            <div className="make-it-yours__preview-actions">
              <button
                type="button"
                className="make-it-yours__image-button"
                onClick={openFilePicker}
              >
                Change photo
              </button>

              <button
                type="button"
                className="make-it-yours__image-button make-it-yours__image-button--quiet"
                onClick={removeImage}
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="make-it-yours__hint">
        Leave these blank and we’ll make something for you.
      </p>
    </div>
  );
}

export default MakeItYours;