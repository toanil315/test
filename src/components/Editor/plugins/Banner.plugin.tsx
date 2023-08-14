import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { BannerNode, INSERT_BANNER_NODE_COMMAND, createBannerNode } from '../nodes/Banner.node';
import { COMMAND_PRIORITY_LOW, $getSelection, $isRangeSelection } from 'lexical';
import { $setBlocksType } from '@lexical/selection';

const BannerPlugin = () => {
  const [editor] = useLexicalComposerContext();
  if (!editor.hasNodes([BannerNode])) {
    throw new Error('Banner node is not registered!');
  }
  editor.registerCommand(
    INSERT_BANNER_NODE_COMMAND,
    () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, createBannerNode);
      }
      return true;
    },
    COMMAND_PRIORITY_LOW,
  );
  return null;
};

export default BannerPlugin;
