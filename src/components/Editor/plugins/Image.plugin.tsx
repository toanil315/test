import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import React from 'react';
import {
  $createImageNode,
  INSERT_IMAGE_NODE_COMMAND,
  ImageNode,
  ImagePayload,
} from '../nodes/Image.node';
import { $insertNodes, COMMAND_PRIORITY_EDITOR } from 'lexical';

const ImagePlugin = () => {
  const [editor] = useLexicalComposerContext();
  if (!editor.hasNodes([ImageNode])) {
    throw new Error('Image node is not registered!');
  }
  editor.registerCommand(
    INSERT_IMAGE_NODE_COMMAND,
    (payload: ImagePayload) => {
      const imageNode = $createImageNode(payload);
      $insertNodes([imageNode]);
      return true;
    },
    COMMAND_PRIORITY_EDITOR,
  );
  return null;
};

export default ImagePlugin;
