import { createGlobalTheme } from '@vanilla-extract/css'

import { font, palette, screens, shadow, spacing } from './tokens'

export const global = createGlobalTheme(':root', {
  font,
  screens,
  palette,
  spacing,
  shadow
})
