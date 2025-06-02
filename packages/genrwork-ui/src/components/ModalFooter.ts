import { useBsPrefix } from '../contexts/modal'
import { generateComponent } from '../generator'

export default generateComponent({
  bsPrefix: ['modal', 'footer'],
  useBsPrefix,
}, 'ModalFooter')
