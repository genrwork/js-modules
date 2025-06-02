import {
  type Context,
  type ElementType,
  type HTMLAttributes,
  useContext,
  useMemo,
} from 'react'
import PropTypes from 'prop-types'

export type ButtonVariant = typeof oneOfButtonVariant[number]

export interface CollapseProps extends
  PropsWithShow,
  TransitionHandlers {
  dimension?: Dimension | (() => Dimension);
}

type Dimension = typeof oneOfDimension[number]

export type EventKey = keyof any // eslint-disable-line @typescript-eslint/no-explicit-any
export type EventKeys = EventKey | readonly EventKey[]

export interface Props<T = HTMLElement> extends HTMLAttributes<T> {
  as?: ElementType;
  bsPrefix?: string;
}

export interface PropsWithShow extends Props {
  show: boolean;
}

export type TransitionHandlers = {
  [K in
    | 'onEnter'
    | 'onEntering'
    | 'onEntered'
    | 'onExit'
    | 'onExiting'
    | 'onExited'
  ]?: VoidFunction;
}

export interface UsePrefixHook {
  (prefix: string, defaultPrefix: string): string;
}

type UseBsPrefixHook = UsePrefixHook extends (...args: infer P) => infer R
  ? (context: Context<{ bsPrefix: string }>, ...args: P) => R
  : never

export type Variant = typeof oneOfVariant[number]

export const keyOfAny = [PropTypes.string, PropTypes.number, PropTypes.symbol]

export const oneOfDimension = ['height', 'width'] as const

export const oneOfVariant = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'dark',
  'light',
] as const

export const oneOfButtonVariant = [
  ...oneOfVariant,
  'link',
  'outline-primary',
  'outline-secondary',
  'outline-success',
  'outline-danger',
  'outline-warning',
  'outline-info',
  'outline-dark',
  'outline-light',
] as const

export const propTypes = {
  as: PropTypes.elementType,
  bsPrefix: PropTypes.string,
}

export const reflow = (elem: HTMLElement) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  elem.offsetHeight
}

export const trimDash = (text: string) => text.replace(trimPtn, '')

// eslint-disable-next-line
const trimPtn = /^[\s\-]+|[\s\-]+$/g

export const useBsPrefix: UseBsPrefixHook = (
  context,
  prefix,
  defaultPrefix
) => {
  const { bsPrefix } = useContext(context)

  return useMemo(() => (
    (trimDash(bsPrefix || '') || trimDash(defaultPrefix)) +
    '-' + trimDash(prefix)
  ), [bsPrefix, prefix, defaultPrefix])
}
