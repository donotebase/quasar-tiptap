/**
 * Quasar Tiptap Extensions
 *
 * @author Micle Bu, micle@oriovo.com
 * @version 1.0
 * @date 2020.04.14
 */
import {
  BulletList,
  CodeBlock,
  CodeBlockHighlight,
  HardBreak,
  ListItem,
  OrderedList,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Placeholder,
  Focus,
  HorizontalRule,
  TrailingNode,
  Image
} from 'tiptap-extensions'

import {
  OTitle,
  ODoc,
  OParagraph,
  OBlockquote,
  OTodoItem,
  OAlignment,
  OIndent,
  OLineHeight,
  OBackColor,
  OForeColor,
  OFontFamily,
  OHeading,
  OIframe,
  ODiagram,
  OKatexBlock,
  OKatexInline,
  OFormatClear
} from 'src/extentions'

const classes = {
  BulletList,
  CodeBlock,
  CodeBlockHighlight,
  HardBreak,
  ListItem,
  OrderedList,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Placeholder,
  Focus,
  HorizontalRule,
  TrailingNode,
  Image,

  OTitle,
  ODoc,
  OParagraph,
  OBlockquote,
  OTodoItem,
  OAlignment,
  OIndent,
  OLineHeight,
  OBackColor,
  OForeColor,
  OFontFamily,
  OHeading,
  OIframe,
  ODiagram,
  OKatexBlock,
  OKatexInline,
  OFormatClear
}

class DynamicClass {
  constructor (className, opts) {
    return new classes[className](opts)
  }
}

export default DynamicClass
