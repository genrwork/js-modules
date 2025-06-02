import { useBsPrefix } from '../contexts/alert'
import { generateComponent } from '../generator'

export default generateComponent({
  tagName: 'h4',
  bsPrefix: ['alert', 'heading'],
  useBsPrefix,
}, 'AlertHeading')
