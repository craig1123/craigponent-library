import React, { Component, Fragment } from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import Badge from '../Badge/Badge';
import UploadSVG from '../icons/upload.svg';
import PDFSVG from '../icons/pdf.svg';
import CloseSVG from '../icons/close.svg';

import styles from './documentUpload.module.scss';

class DocumentUpload extends Component {
  state = {
    imageFiles: this.props.existingFiles,
    error: null,
    selectedFilePreview: 0,
  };

  setPreview = i => () => {
    this.setState({ selectedFilePreview: i });
  };

  onRemoveImage = e => {
    e.preventDefault();
    e.stopPropagation();
    if (this.props.onRemoveImage) {
      this.props.onRemoveImage();
    }
    this.setState({ imageFiles: [] });
  };

  onFileReject = files => {
    const {
      onFileReject,
      maxFileSize,
      multiple,
      accept,
      styleType,
    } = this.props;
    let error =
      'There was an unknown error when attempting to upload your file. Please try again';

    if (files.length > 0) {
      const fileSize = files[0].size;
      const fileType = files[0].type;
      if (fileSize > maxFileSize) {
        error = `File size exceeds the ${Math.floor(
          maxFileSize / 1000000,
        )}MB limit.`;
      } else if (!multiple && files.length > 1) {
        error = 'You may only upload one file.';
      } else if (accept.length && !accept.includes(fileType)) {
        error = `Invalid file type.${
          styleType === 'box' ? ` Allowed file types: ${this.getAllowed()}` : ''
        }`;
      }
    }

    if (onFileReject) {
      onFileReject(files);
    }

    this.setState({ error });
  };

  onDropAccepted = file => {
    this.props.onImageUpload(file);
    this.setState({ imageFiles: file, error: null });
  };

  getAllowed = () => {
    if (this.props.acceptText) {
      return this.props.acceptText;
    }
    if (this.props.accept) {
      return this.props.accept
        .replace(/image\//g, '.')
        .replace(/text\//g, '.')
        .split(', ')
        .join(', ')
        .replace(/, ([^,]*)$/, ', or $1');
    }
    return 'any';
  };

  render() {
    const {
      accept,
      btnText,
      className,
      existingFiles,
      label,
      maxFileSize,
      onFileReject,
      onImageUpload,
      onRemoveImage,
      styleMode,
      styleType,
      multiple,
      uploadPreview,
      ...rest
    } = this.props;
    const { imageFiles, error, selectedFilePreview } = this.state;
    const boxType = styleType === 'box';
    const hasDocUploaded = imageFiles.length > 0 && !!imageFiles[0].name;
    let uploadImage = (
      <div className={styles['svg-button']}>
        <UploadSVG /> {btnText}
      </div>
    );
    let dropFileText = multiple ? 'Drop File(s)' : 'Drop File';

    if (hasDocUploaded) {
      dropFileText = multiple
        ? 'Drop File(s) to Replace'
        : 'Drop File to Replace';

      const file = imageFiles[selectedFilePreview];
      const fileTypeArr = file.name.split('.');
      const fileType = fileTypeArr[fileTypeArr.length - 1];
      const pdfFill = styleMode === 'dark' ? '#fff' : '#2f3337';
      if (!uploadPreview) {
        uploadImage = null;
      } else if (fileType === 'pdf') {
        uploadImage = (
          <div className={styles['uploaded-doc-wrapper']}>
            <PDFSVG fillColor={pdfFill} height={34} width={34} />
          </div>
        );
      } else if (
        fileType === 'jpeg' ||
        fileType === 'jpg' ||
        fileType === 'png' ||
        fileType === 'gif'
      ) {
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(file);
        uploadImage = (
          <Fragment>
            <span />
            <img alt="uploaded" src={imageUrl} />
            <span />
          </Fragment>
        );
      } else {
        uploadImage = (
          <div className={styles['uploaded-doc-wrapper']}>
            <PDFSVG pdf={false} fillColor={pdfFill} height={34} width={34} />
          </div>
        );
      }
    }

    if (!boxType) {
      uploadImage = (
        <Fragment>
          <p className="">Allowed file types: {this.getAllowed()}</p>
          {uploadImage}
        </Fragment>
      );
    }

    const darkMode = styleMode === 'dark' ? styles.dark : '';
    const dropType = boxType
      ? styles['box-upload']
      : styles['thumbnail-upload'];

    return (
      <div className={styles['document-upload']}>
        {label && <p className={styles.label}>{label}</p>}
        <Dropzone
          accept={accept}
          maxSize={maxFileSize}
          onDropRejected={this.onFileReject}
          onDropAccepted={this.onDropAccepted}
          {...rest}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              {...getRootProps()}
              className={`${styles['image-upload']} ${dropType} ${darkMode} ${
                error ? styles.error : ''
              } ${isDragActive ? styles.active : ''}${className}`.trim()}
            >
              {hasDocUploaded && (
                <div
                  className={styles['clear-image']}
                  onClick={this.onRemoveImage}
                  onKeyPress={this.onRemoveImage}
                  role="button"
                  tabIndex={0}
                >
                  <CloseSVG fillColor="#17181A" />
                </div>
              )}
              {imageFiles.length > 1 && (
                <Badge className={styles['upload-count']}>
                  {selectedFilePreview + 1} / {imageFiles.length}
                </Badge>
              )}
              <input {...getInputProps()} />
              {isDragActive ? (
                <span className={`${styles['drop-file-text']} ${darkMode}`}>
                  {dropFileText}
                </span>
              ) : (
                uploadImage
              )}
            </div>
          )}
        </Dropzone>
        <small
          className={`${styles['image-name']} ${error ? styles.error : ''}`}
        >
          {hasDocUploaded &&
            uploadPreview &&
            (imageFiles.length === 1
              ? imageFiles[0].name
              : imageFiles.map((file, i) => (
                  <Fragment key={file.name}>
                    {i > 0 && <span>, </span>}
                    <button
                      onClick={this.setPreview(i)}
                      className={styles['set-preview-button']}
                      type="button"
                    >
                      {file.name}
                    </button>
                  </Fragment>
                )))}
          {error}
        </small>
      </div>
    );
  }
}

DocumentUpload.propTypes = {
  /** File types whitelisted. Everything else will not work */
  accept: PropTypes.string,
  acceptText: PropTypes.string,
  btnText: PropTypes.string,
  className: PropTypes.string,
  existingFiles: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  label: PropTypes.string,
  maxFileSize: PropTypes.number,
  multiple: PropTypes.bool,
  onFileReject: PropTypes.func,
  onImageUpload: PropTypes.func,
  onRemoveImage: PropTypes.func,
  styleMode: PropTypes.oneOf(['dark', 'light']),
  styleType: PropTypes.oneOf(['box', 'thumbnail']),
  uploadPreview: PropTypes.bool,
};

DocumentUpload.defaultProps = {
  accept: 'image/jpeg, image/jpg, image/png, image/gif',
  acceptText: '',
  btnText: 'Upload Image',
  className: '',
  existingFiles: [],
  label: '',
  maxFileSize: 4194300,
  multiple: false,
  onFileReject: null,
  onImageUpload: () => {},
  onRemoveImage: null,
  styleMode: 'light',
  styleType: 'box',
  uploadPreview: true,
};

export default DocumentUpload;
