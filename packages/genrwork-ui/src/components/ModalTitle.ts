import { useBsPrefix } from '../contexts/modal'
import { generateComponent } from '../generator'

export default generateComponent({
  tagName: 'h5',
  bsPrefix: ['modal', 'title'],
  useBsPrefix,
}, 'ModalTitle')
