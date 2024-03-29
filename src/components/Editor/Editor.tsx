import { EditorState, LexicalEditor } from 'lexical';
import { useEffect, useRef, useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { EditorRefPlugin } from '@lexical/react/LexicalEditorRefPlugin';
import { $generateHtmlFromNodes } from '@lexical/html';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { StyledEditor } from './styled';
import Toolbar from './Toolbar';
import BannerPlugin from './plugins/Banner.plugin';
import { BannerNode } from './nodes/Banner.node';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { ListItemNode, ListNode } from '@lexical/list';
import ImagePlugin from './plugins/Image.plugin';
import { ImageNode } from './nodes/Image.node';

const theme = {
  // Theme styling goes here
  // ...
};

function OnChangePlugin({ onChange }: { onChange: (editorState: EditorState) => void }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener((event) => {
      onChange(event.editorState);
    });
  }, [editor, onChange]);
  return null;
}

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}

function onError(error: any) {
  // console.error(error);
}

function Editor() {
  const initialConfig = {
    namespace: 'MyEditor',
    theme: {
      text: {
        base: 'base',
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline',
        strikethrough: 'line-through',
      },
      banner: 'banner',
      image: 'image',
    },
    onError,
    nodes: [BannerNode, ListItemNode, ListNode, ImageNode],
  };

  const [editorState, setEditorState] = useState<string>();
  const editorRef = useRef<LexicalEditor>(null);
  function onChange(editorState: EditorState) {
    const editorStateJSON = editorState.toJSON();
    setEditorState(JSON.stringify(editorStateJSON));
  }

  useEffect(() => {
    setTimeout(() => {
      if (editorRef.current) {
        // // insert by html string
        // editorRef.current.update(() => {
        //   const parser = new DOMParser();
        //   const dom = parser.parseFromString(
        //     `<p><div class="image"><img src="https://imgv3.fotor.com/images/blog-richtext-image/part-blurry-image.jpg" alt="editor image"></div></p>`,
        //     'text/html',
        //   );
        //   const nodes = $generateNodesFromDOM(editorRef.current as any, dom);
        //   $getRoot().select();
        //   $insertNodes(nodes);
        // });
        // // insert editor state
        // const newEditorState = editorRef.current?.parseEditorState(
        //   `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"asasasas asasasa","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"asasasasasasasas","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
        // );
        // editorRef.current?.setEditorState(newEditorState);
      }
    }, 5000);
  }, []);

  const handleExportDom = () => {
    if (editorRef.current) {
      editorRef.current.getEditorState().read(() => {
        const htmlString = $generateHtmlFromNodes(editorRef.current as any, null);
        console.log(htmlString);
      });
    }
  };

  return (
    <>
      <StyledEditor>
        <LexicalComposer initialConfig={initialConfig}>
          <Toolbar />
          <RichTextPlugin
            contentEditable={<ContentEditable className='content-editable' />}
            placeholder={<div className='placeholder'>Enter some text...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin onChange={onChange} />
          <HistoryPlugin />
          <EditorRefPlugin editorRef={editorRef} />
          <BannerPlugin />
          <ListPlugin />
          <ImagePlugin />
        </LexicalComposer>
      </StyledEditor>
      <button onClick={handleExportDom}>EXPORT DOM</button>
    </>
  );
}

export default Editor;
