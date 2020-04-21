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
export { default as OTitle } from 'src/extentions/Title'
export { default as ODoc } from 'src/extentions/Doc'
export { default as OParagraph } from 'src/extentions/Paragraph'
export { default as OBlockquote } from 'src/extentions/Blockquote'
export { default as OTodoItem } from 'src/extentions/TodoItem'
export { default as ODiagram } from 'src/extentions/Diagram'
export { default as OHeading } from 'src/extentions/Heading'
export { default as OIframe } from 'src/extentions/Iframe'
export { default as OKatexBlock } from 'src/extentions/KatexBlock'
export { default as OKatexInline } from 'src/extentions/KatexInline'

// Marks
export { default as OBackColor } from 'src/extentions/BackColor'
export { default as OForeColor } from 'src/extentions/ForeColor'
export { default as OFontFamily } from 'src/extentions/FontFamily'

// Extensions
export { default as OAlignment } from 'src/extentions/Alignment'
export { default as OIndent } from 'src/extentions/Indent'
export { default as OLineHeight } from 'src/extentions/LineHeight'
export { default as OFormatClear } from 'src/extentions/FormatClear'
export { default as OPrint } from 'src/extentions/Print'
export { default as OImage } from 'src/extentions/Image'

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
  // 'Image',
]

export const QuasarTipTapExtensions = [
  'OTitle',
  'ODoc',
  'OParagraph',
  'OBlockquote',
  'OTodoItem',
  'OHeading',
  'OAlignment',
  'OIndent',
  'OLineHeight',
  'OForeColor',
  'OBackColor',
  'OFontFamily',
  'OIframe',
  'ODiagram',
  'OKatexBlock',
  'OKatexInline',
  'OFormatClear',
  'OPrint',
  'OImage',
]

export const RecommendedExtensions = [
  ...TipTapExtensions,
  ...QuasarTipTapExtensions
]
