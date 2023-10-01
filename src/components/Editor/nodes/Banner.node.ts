import React from 'react';
import {
  $createParagraphNode,
  EditorConfig,
  ElementNode,
  LexicalEditor,
  LexicalNode,
  RangeSelection,
  SerializedElementNode,
  SerializedLexicalNode,
  createCommand,
} from 'lexical';

export class BannerNode extends ElementNode {
  static getType(): string {
    return 'banner';
  }

  static clone(node: BannerNode): BannerNode {
    return new BannerNode(node.__key);
  }

  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const element = document.createElement('div');
    element.className = _config.theme.banner;
    return element;
  }

  updateDOM(_prevNode: unknown, _dom: HTMLElement, _config: EditorConfig): boolean {
    return false;
  }

  insertNewAfter(
    selection: RangeSelection,
    restoreSelection?: boolean | undefined,
  ): LexicalNode | null {
    const newBlock = $createParagraphNode();
    const direction = this.getDirection();
    newBlock.setDirection('ltr');
    this.insertAfter(newBlock, restoreSelection);
    return newBlock;
  }

  collapseAtStart(): boolean {
    const paragraphs = $createParagraphNode();
    const childs = this.getChildren();
    childs.forEach((child) => paragraphs.append(child));
    this.replace(paragraphs);
    return true;
  }

  exportJSON(): SerializedElementNode<SerializedLexicalNode> {
    return {
      ...super.exportJSON(),
      type: 'banner',
      version: 1,
    };
  }
}

export const createBannerNode = (): BannerNode => {
  return new BannerNode();
};

export const isBannerNode = (node: LexicalNode): node is BannerNode => {
  return node instanceof BannerNode;
};

export const INSERT_BANNER_NODE_COMMAND = createCommand('insert-banner-node');
