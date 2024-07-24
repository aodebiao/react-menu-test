/// <reference types="react-scripts" />
/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare module "classnames" {
    import classNames from 'classnames'
    export default classNames
}
type RefType = MutableRefObject<unknown> | ((instance: unknown) => void)

type CommonObjectType<T = any> = Record<string, T>
