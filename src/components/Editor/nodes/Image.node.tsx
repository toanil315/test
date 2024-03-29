import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  RangeSelection,
  SerializedLexicalNode,
  Spread,
} from 'lexical';
import { $createParagraphNode, createCommand, createEditor, DecoratorNode } from 'lexical';
import Image from '../sub-components/Image';

export interface ImagePayload {
  altText: string;
  src: string;
  uploadPromise?: Promise<string>;
}

function convertImageElement(domNode: Node): null | DOMConversionOutput {
  if (domNode instanceof HTMLImageElement) {
    const { alt: altText, src } = domNode;
    const node = $createImageNode({ altText, src });
    return { node };
  }
  return null;
}

export type SerializedImageNode = Spread<
  {
    altText: string;
    src: string;
    type: 'image';
    version: 1;
  },
  SerializedLexicalNode
>;

export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __altText: string;
  __uploadPromise?: Promise<string>;

  static getType(): string {
    return 'image';
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__altText, undefined, node.__key);
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { altText, src } = serializedNode;
    const node = $createImageNode({
      altText,
      src,
    });
    return node;
  }

  exportDOM(editor: LexicalEditor): DOMExportOutput {
    const divElement = document.createElement('div');
    const className = editor._config.theme.image;
    if (className) {
      divElement.className = className;
    }
    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', this.__src);
    imageElement.setAttribute('alt', this.__altText);
    divElement.appendChild(imageElement);
    return { element: divElement };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: (node: Node) => ({
        conversion: convertImageElement,
        priority: 0,
      }),
    };
  }

  constructor(src: string, altText: string, uploadPromise?: Promise<string>, key?: NodeKey) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__uploadPromise = uploadPromise;
  }

  exportJSON(): SerializedImageNode {
    return {
      altText: this.getAltText(),
      src: this.getSrc(),
      type: 'image',
      version: 1,
    };
  }

  createDOM(config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const element = document.createElement('div');
    const className = config.theme.image;
    if (className !== undefined) {
      element.className = className;
    }
    if (this.__uploadPromise) {
      this.__uploadPromise
        .then((newSrc) => this.setSrc(_editor, newSrc))
        .catch((error) => console.log(error));
    }
    return element;
  }

  updateDOM(): false {
    return false;
  }

  getSrc(): string {
    return this.__src;
  }

  setSrc(_editor: LexicalEditor, src: string): void {
    _editor.update(() => {
      const writeable = this.getWritable();
      writeable.__src = src;
    });
  }

  getAltText(): string {
    return this.__altText;
  }

  decorate(_editor: LexicalEditor): JSX.Element {
    return (
      <Image
        src={this.__src}
        altText={this.__altText}
      />
    );
  }

  insertNewAfter(
    selection: RangeSelection,
    restoreSelection?: boolean | undefined,
  ): LexicalNode | null {
    const newBlock = $createParagraphNode();
    const direction = this.getDirection();
    newBlock.setDirection('rtl');
    this.insertAfter(newBlock, restoreSelection);
    return newBlock;
  }
}

export function $createImageNode({ altText, src, uploadPromise }: ImagePayload): ImageNode {
  return new ImageNode(src, altText, uploadPromise);
}

export function $isImageNode(node: LexicalNode | null | undefined): node is ImageNode {
  return node instanceof ImageNode;
}

export const INSERT_IMAGE_NODE_COMMAND = createCommand('insert-image-command');
