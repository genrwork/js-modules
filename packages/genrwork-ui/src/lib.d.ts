type CSSModuleClasses = { readonly [key: string]: string }

declare module '*.scss' {
  const classes: CSSModuleClasses
  export default classes
}
declare module '*.sass' {
  const classes: CSSModuleClasses
  export default classes
}
