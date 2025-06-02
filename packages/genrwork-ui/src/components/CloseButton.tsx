import { generateComponent } from '../generator'
import { propTypes } from '../helpers'

const CloseButton = generateComponent({
  tagName: 'button',
  'aria-label': 'Close',
  bsPrefix: 'btn-close',
})

CloseButton.displayName = 'CloseButton'

CloseButton.propTypes = propTypes

export default CloseButton
