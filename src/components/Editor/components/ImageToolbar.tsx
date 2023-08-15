import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import React, { ChangeEvent } from 'react';
import { INSERT_IMAGE_NODE_COMMAND } from '../nodes/Image.node';

const ImageToolbar = () => {
  const [editor] = useLexicalComposerContext();
  const handleSelectImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        editor.dispatchCommand(INSERT_IMAGE_NODE_COMMAND, {
          src: fileReader.result,
          uploadPromise: new Promise((resolve) => {
            setTimeout(() => {
              resolve('https://imgv3.fotor.com/images/blog-richtext-image/part-blurry-image.jpg');
            }, 3000);
          }),
          alt: '',
        });
      });
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`
      px-2 bg-transparent hover:bg-gray-200 transition-colors duration-100 ease-in`}
    >
      <label htmlFor='image-upload'>
        <FontAwesomeIcon
          icon={faImage}
          className=' w-3.5 h-3.5'
        />
        <input
          id='image-upload'
          className='hidden'
          type='file'
          onChange={handleSelectImage}
        />
      </label>
    </div>
  );
};

export default ImageToolbar;
