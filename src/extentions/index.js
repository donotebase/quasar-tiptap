/**
 * Quasar Tiptap Extensions
 *
 * @author Micle Bu, micle@oriovo.com
 * @version 1.0
 * @date 2020.04.11
 */

// --------------------------------------------------------------------------------
// Extensions
// --------------------------------------------------------------------------------
// Nodes
export { default as OTitle } from './Title'
export { default as ODoc } from './Doc'
export { default as OParagraph } from './Paragraph'
export { default as OBlockquote } from './Blockquote'
export { default as OTodoItem } from './TodoItem'
export { default as ODiagram } from './Diagram'
export { default as OHeading } from './Heading'
export { default as OIframe } from './Iframe'
export { default as OKatexBlock } from './KatexBlock'
export { default as OKatexInline } from './KatexInline'

// Marks
export { default as OBackColor } from './BackColor'
export { default as OForeColor } from './ForeColor'
export { default as OFontFamily } from './FontFamily'

// Extensions
export { default as OAlignment } from './Alignment'
export { default as OIndent } from './Indent'
export { default as OLineHeight } from './LineHeight'
export { default as OFormatClear } from './FormatClear'

// --------------------------------------------------------------------------------
// Exposed Extension List
// --------------------------------------------------------------------------------
export const TipTapExtensions = [
  'Bold',
  'Italic',
  'Strike',
  'Underline',
  'Code',
  'CodeBlock',
  'CodeBlockHighlight',
  'BulletList',
  'OrderedList',
  'ListItem',
  'TodoList',
  'HorizontalRule',
  'Table',
  'Link',
  'Image',
]

export const QuasarTipTapExtensions = [
  'OTitle',
  'ODoc',
  'OParagraph',
  'OBlockquote',
  'OTodoItem',
  'OHeading',
  'OAlignment',
  'OLineHeight',
  'OForeColor',
  'OBackColor',
  'OFontFamily',
  'OIframe',
  'ODiagram',
  'OKatexBlock',
  'OKatexInline',
  'OFormatClear',
]

export const RecommendedExtensions = [
  ...TipTapExtensions,
  ...QuasarTipTapExtensions
]
