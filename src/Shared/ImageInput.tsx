import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';
import { Field } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Show } from 'Layout';

const TYPE_ERR_MSG = 'Image format is not valid, only jpeg or png supported.';
const SIZE_ERR_MSG = 'Image less than 3Mb is supported.';
const MAX_SIZE_KB = 307200;

// @todo: To fix.
function validateImageWeight(imageFile: File): Promise<never> | null {
  if (imageFile && imageFile.size) {
    const imageFileKb = imageFile.size / 1024;
    if (imageFileKb > MAX_SIZE_KB) {
      return Promise.reject(new Error(SIZE_ERR_MSG));
    }
  }
  return null;
}

// @todo: To fix.
function validateImageFormat(imageFile: File): Promise<never> | null {
  if (!imageFile) return null;
  if (imageFile.type !== 'image/png' && imageFile.type !== 'image/jpeg') {
    return Promise.reject(new Error(TYPE_ERR_MSG));
  }
  return null;
}

// @todo: To add types.
export function ImageInput(props) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  // @todo: To add types.
  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    if (!event.target.files.length) return;

    const file = event.target.files[0];
    Promise.resolve()
      .then(() => validateImageFormat(file))
      .then(() => validateImageWeight(file))
      // .then(() => FileUploadAPI.uploadSingleFile(
      //   file,
      //   props.fileUploadType,
      //   props.entityId,
      //   setUploadProgress,
      // ))
      .then(() => props.change(props.fieldName))
      .catch((error$) => {
        props.change('thumbnailUrl', null);
        setError(error$.message);
      });
  }

  function clearThumbnailUrl(): void {
    props.change(props.fieldName, null);
  }

  function thumbnailFieldClassname(): string {
    return !props.thumbnailUrl
      ? 'invisible'
      : 'form-control h-30p rounded-0';
  }

  return (
    <div className="form-group">
      <label htmlFor="thumbnail">
        {props.label} <code>*</code>
      </label>

      <Show when={!props.thumbnailUrl}>
        <input
          type="file"
          onChange={handleFileSelect}
          className="form-control bg-transparent mb-2"
          id="thumbnail"
          name="thumbnail"
          accept="image/*"
          required
        />
      </Show>

      <div className="d-flex align-items-center">
        <Field
          component="input"
          className={thumbnailFieldClassname()}
          name={props.fieldName}
          placeholder={props.thumbnailUrl}
          readOnly
        />

        <Show when={!!props.thumbnailUrl}>
          <button
            type="button"
            onClick={clearThumbnailUrl}
            className="btn btn-sm btn-danger rounded-0 h-30p"
          >
            <FontAwesomeIcon icon={['fas', 'times']} />
          </button>
        </Show>
      </div>

      <Show when={uploadProgress > 0 && uploadProgress <= 99.99}>
        <ProgressBar
          className="h-15p"
          now={uploadProgress}
          label={`${uploadProgress}%`}
          striped
        />
      </Show>

      <Show when={uploadProgress > 99.99 && !error}>
        <small className="form-text text-success">
          Image has been successfully uploaded
        </small>
      </Show>

      <Show when={!!error}>
        <small className="form-text text-danger">
          {error}
        </small>
      </Show>
    </div>
  );
}

ImageInput.propTypes = {
  fileUploadType: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  fieldName: PropTypes.string,
  thumbnailUrl: PropTypes.string,
  label: PropTypes.string,
  entityId: PropTypes.string,
};

ImageInput.defaultProps = {
  fieldName: 'thumbnailUrl',
  thumbnailUrl: null,
  entityId: null,
  label: 'Thumbnail',
};
