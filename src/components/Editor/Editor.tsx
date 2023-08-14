import { $getRoot, $getSelection, EditorState, LexicalEditor, $insertNodes } from 'lexical';
import { useEffect, useRef, useState } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { EditorRefPlugin } from '@lexical/react/LexicalEditorRefPlugin';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { StyledEditor } from './styled';
import Toolbar from './Toolbar';

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
    },
    onError,
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
        // editorRef.current.update(() => {
        //   const parser = new DOMParser();
        //   const dom = parser.parseFromString(
        //     `<p dir="ltr"><span>asasasas asasasa</span></p><p dir="ltr"><span></span></p><p><br></p><p dir="ltr"><span>asasasasasasasas</span></p>`,
        //     'text/html',
        //   );
        //   const nodes = $generateNodesFromDOM(editorRef.current as any, dom);
        //   $getRoot().select();
        //   $insertNodes(nodes);
        // });
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
        </LexicalComposer>
      </StyledEditor>
      <button onClick={handleExportDom}>EXPORT DOM</button>
    </>
  );
}

export default Editor;
