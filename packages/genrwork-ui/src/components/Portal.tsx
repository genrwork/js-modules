import { type ReactNode } from 'react'
import ReactDOM from 'react-dom'

const Portal = (props: {
  node?: HTMLElement;
  children: ReactNode;
}) => typeof document != 'undefined' && ReactDOM.createPortal(
  <>{props.children}</>,
  props.node || document.body,
)

export default Portal
