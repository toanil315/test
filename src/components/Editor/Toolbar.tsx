import {
  faAlignCenter,
  faAlignJustify,
  faAlignLeft,
  faAlignRight,
  faBold,
  faItalic,
  faRedo,
  faStrikethrough,
  faUnderline,
  faUndo,
  faQuoteLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelectionStyleValueForProperty, $patchStyleText } from '@lexical/selection';
import { mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  BLUR_COMMAND,
  COMMAND_PRIORITY_LOW,
  FOCUS_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  RangeSelection,
  UNDO_COMMAND,
} from 'lexical';
import { ChangeEvent, useCallback, useEffect, useState, useRef } from 'react';
import { INSERT_BANNER_NODE_COMMAND } from './nodes/Banner.node';

const Toolbar = () => {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [fontSize, setFontSize] = useState<number>(16);
  const [activeSelectionRange, setActiveSelectionRange] = useState<RangeSelection | null>(null);
  const [previousSelectionRange, setPreviousSelectionRange] = useState<RangeSelection | null>(null);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsUnderline(selection.hasFormat('underline'));
      setFontSize(
        Number($getSelectionStyleValueForProperty(selection, 'font-size', '16').replace('px', '')),
      );
      setActiveSelectionRange(selection);
    }
  }, []);

  const handleFontSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFontSize = Number(e.target.value ?? 16);
    setFontSize(newFontSize);
  };

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        FOCUS_COMMAND,
        () => {
          setPreviousSelectionRange(null);
          return true;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      BLUR_COMMAND,
      () => {
        setPreviousSelectionRange(() => activeSelectionRange);
        return true;
      },
      COMMAND_PRIORITY_LOW,
    );
  }, [activeSelectionRange]);

  const debounceRef = useRef<any>(null);
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      editor.update(() => {
        if ($isRangeSelection(previousSelectionRange)) {
          $patchStyleText(previousSelectionRange, {
            'font-size': `${fontSize}px`,
          });
        }
      });
      debounceRef.current = null;
    }, 300);
  }, [fontSize]);

  return (
    <div className='absolute z-20  -top-10 min-w-52 h-10 py-2 mb-4 space-x-2 flex items-center '>
      <div className='font-size-area w-14 border border-gray-200 rounded-lg px-2 flex items-center justify-between'>
        <input
          value={fontSize}
          onChange={handleFontSizeChange}
          className='w-full outline-none bg-transparent'
        />
        <span className='text-sm font-medium'>px</span>
      </div>
      <button
        className={`px-2 hover:bg-gray-200 transition-colors duration-100 ease-in ${
          isBold ? 'bg-gray-200' : 'bg-transparent'
        } `}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
      >
        <FontAwesomeIcon
          icon={faBold}
          className=' w-3.5 h-3.5'
        />
      </button>
      <button
        className={`
          px-2 hover:bg-gray-200 transition-colors duration-100 ease-in
          ${isStrikethrough ? 'bg-gray-200' : 'bg-transparent'}
        `}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
        }}
      >
        <FontAwesomeIcon
          icon={faStrikethrough}
          className=' w-3.5 h-3.5'
        />
      </button>
      <button
        className={`
          px-2 hover:bg-gray-200 transition-colors duration-100 ease-in
          ${isItalic ? 'bg-gray-200' : 'bg-transparent'}
        `}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        }}
      >
        <FontAwesomeIcon
          icon={faItalic}
          className=' w-3.5 h-3.5'
        />
      </button>
      <button
        className={`
          px-2 hover:bg-gray-200 transition-colors duration-100 ease-in
          ${isUnderline ? 'bg-gray-200' : 'bg-transparent'}
        `}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        }}
      >
        <FontAwesomeIcon
          icon={faUnderline}
          className=' w-3.5 h-3.5'
        />
      </button>

      <span className='w-[1px] bg-gray-600 block h-full'></span>

      <button
        className={`
          px-2 bg-transparent hover:bg-gray-200 transition-colors duration-100 ease-in`}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
        }}
      >
        <FontAwesomeIcon
          icon={faAlignLeft}
          className=' w-3.5 h-3.5'
        />
      </button>
      <button
        className={`
          px-2 bg-transparent hover:bg-gray-200 transition-colors duration-100 ease-in`}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
        }}
      >
        <FontAwesomeIcon
          icon={faAlignCenter}
          className=' w-3.5 h-3.5'
        />
      </button>
      <button
        className={`
          px-2 bg-transparent hover:bg-gray-200 transition-colors duration-100 ease-in`}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
        }}
      >
        <FontAwesomeIcon
          icon={faAlignRight}
          className=' w-3.5 h-3.5'
        />
      </button>
      <button
        className={`
          px-2 bg-transparent hover:bg-gray-200 transition-colors duration-100 ease-in`}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
        }}
      >
        <FontAwesomeIcon
          icon={faAlignJustify}
          className=' w-3.5 h-3.5'
        />
      </button>

      <span className='w-[1px] bg-gray-600 block h-full'></span>

      <button
        className={`
          px-2 bg-transparent hover:bg-gray-200 transition-colors duration-100 ease-in`}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
      >
        <FontAwesomeIcon
          className=' w-3.5 h-3.5'
          icon={faUndo}
        />
      </button>
      <button
        className={`
          px-2 bg-transparent hover:bg-gray-200 transition-colors duration-100 ease-in`}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
      >
        <FontAwesomeIcon
          icon={faRedo}
          className=' w-3.5 h-3.5'
        />
      </button>
      <span className='w-[1px] bg-gray-600 block h-full'></span>
      <button
        className={`
          px-2 bg-transparent hover:bg-gray-200 transition-colors duration-100 ease-in`}
        onClick={() => {
          editor.dispatchCommand(INSERT_BANNER_NODE_COMMAND, undefined);
        }}
      >
        <FontAwesomeIcon
          icon={faQuoteLeft}
          className=' w-3.5 h-3.5'
        />
      </button>
    </div>
  );
};

export default Toolbar;
