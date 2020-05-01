/**
 * Data: Editor
 *
 * @author Micle Bu, micle@oriovo.com
 * @version 1.0
 * @date 2020.04.11
 */

/**
 * Command component except for simple commands
 */
export const CommandComponents = {
  'add-more': 'o-add-more-btn',
  'font-family': 'o-font-family-dropdown',
  'fore-color': 'o-fore-color-dropdown',
  'back-color': 'o-back-color-dropdown',
  'align-dropdown': 'o-align-dropdown',
  'align-group': 'o-align-group',
  'line-height': 'o-line-height-dropdown',
  'list-dropdown': 'o-list-dropdown',
  'indent-dropdown': 'o-indent-dropdown',
  'text-format-dropdown': 'o-text-format-dropdown',
  heading: 'o-heading-dropdown',
  link: 'o-link-btn',
  photo: 'o-photo-btn',
  table: 'o-table-btn',
}

export const DefaultToolbar = [
  'add-more',
  'separator',
  'bold',
  'italic',
  'underline',
  'strike',
  'code',
  'separator',
  'heading',
  'font-family',
  'fore-color',
  'back-color',
  'format_clear',
  'separator',
  'align-dropdown',
  'indent',
  'outdent',
  'line-height',
  'separator',
  'horizontal',
  'bullet_list',
  'ordered_list',
  'todo_list',
  'separator',
  'blockquote',
  'code_block',
  'link',
  'photo',
  'table',
  'separator',
  'undo',
  'redo',
  'separator',
  'print',
]

/**
 * Table toolbar
 */
export const TableToolbar = [
  'add-more',
  'separator',
  'bold',
  'italic',
  'code',
  'separator',
  'font-family',
  'fore-color',
  'back-color',
  'format_clear',
  'separator',
  'bullet_list',
  'ordered_list',
  'todo_list',
  'separator',
  'align-dropdown',
  'separator',
  'table',
]

/**
 * Bubble toolbar
 */
export const DefaultBubble = [
  'bold',
  'italic',
  'separator',
  'font-family',
  'fore-color',
  'back-color',
  'separator',
  'link',
  'separator',
  'align-group',
]

export const DefaultEmbedServices = {
  video: ['youtube', 'youku', 'bilibili', 'qqvideo'],
  map: ['google_map', 'amap', 'baidu_map'],
  design: ['modao', 'lanhu', 'figma', 'canva', 'processon'],
  develop: ['codepen'],
  data: ['google_forms', 'jinshuju'],
  others: ['iframe']
}
