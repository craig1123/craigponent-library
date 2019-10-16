import React from 'react';
import { mount } from 'enzyme';
import DocumentUpload from './DocumentUpload';

function createFile(name, size, type) {
  const file = new File([], name, { type });
  Object.defineProperty(file, 'size', {
    get() {
      return size;
    },
  });
  return file;
}

// NOTE: Don't test things that react-dropzone already tests like callback funcs
// https://github.com/react-dropzone/react-dropzone/blob/master/src/index.spec.js

describe('DocumentUpload', () => {
  let files;
  let images;

  beforeEach(() => {
    files = [createFile('file1.pdf', 1111, 'application/pdf')];
    images = [
      createFile('dogs.gif', 1234, 'image/gif'),
      createFile('Craig.jpg', 2345, 'image/jpeg'),
    ];
  });

  afterEach(() => {
    files = null;
    images = null;
  });

  /* ----------- Props ----------- */
  it('should render prop accept correctly', () => {
    const nothingWrapper = mount(<DocumentUpload />);
    const csvWrapper = mount(
      <DocumentUpload accept="text/csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />,
    );
    const imgDocWrapper = mount(
      <DocumentUpload accept=".doc, .docx, .pdf, image/jpeg, image/png" />,
    );

    expect(
      nothingWrapper
        .find('input')
        .hostNodes()
        .prop('accept'),
    ).toBe('image/jpeg, image/jpg, image/png, image/gif');
    expect(
      csvWrapper
        .find('input')
        .hostNodes()
        .prop('accept'),
    ).toBe(
      'text/csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    expect(
      imgDocWrapper
        .find('input')
        .hostNodes()
        .prop('accept'),
    ).toBe('.doc, .docx, .pdf, image/jpeg, image/png');
  });

  it('should render prop acceptText correctly', () => {
    const imgDocWrapper = mount(
      <DocumentUpload
        styleType="thumbnail"
        accept=".doc, .docx, .pdf, image/jpeg, image/png"
      />,
    );
    const acceptText = "I don't care what types you use!";
    const acceptTextWrapper = mount(
      <DocumentUpload styleType="thumbnail" acceptText={acceptText} />,
    );

    expect(imgDocWrapper.find('p').text()).toBe(
      'Allowed file types: .doc, .docx, .pdf, .jpeg, or .png',
    );
    expect(acceptTextWrapper.find('p').text()).toBe(
      `Allowed file types: ${acceptText}`,
    );
  });

  it('should render prop existingFiles correctly', () => {
    const wrapper = mount(<DocumentUpload existingFiles={files} />);

    expect(wrapper.state('imageFiles')).toEqual(files);
  });

  it('should render prop label correctly', () => {
    const label = 'I am a label';
    const wrapper = mount(<DocumentUpload label={label} />);

    expect(
      wrapper
        .find('p')
        .at(0)
        .text(),
    ).toBe(label);
  });

  it('should render prop styleMode correctly', () => {
    const wrapper = mount(
      <DocumentUpload styleMode="dark" existingFiles={files} />,
    );
    const pdfSvg = wrapper.find('svg').at(1);

    expect(
      pdfSvg
        .find('path')
        .at(0)
        .hostNodes()
        .prop('fill'),
    ).toBe('#fff');
  });

  /* ----------- Methods ----------- */
  it('should remove imageFiles onRemoveImage', () => {
    const wrapper = mount(<DocumentUpload existingFiles={files} />);
    wrapper.find('div[role="button"]').simulate('click');

    expect(wrapper.state('imageFiles')).toEqual([]);
  });

  it('should set a preview for multiple images', () => {
    const wrapper = mount(<DocumentUpload existingFiles={images} />);
    wrapper
      .find('button')
      .at(1)
      .simulate('click');

    expect(wrapper.state('selectedFilePreview')).toEqual(1);

    wrapper
      .find('button')
      .at(0)
      .simulate('click');

    expect(wrapper.state('selectedFilePreview')).toEqual(0);
  });
});
