import React from "react"

export type WASM = typeof import("./crate")

export function useCrate() {
    const [wasm, setWasm] = React.useState(undefined as unknown)

    React.useEffect(() => {
        ;(async () => {
            const mod = await import("./crate")
            setWasm(mod)
        })()
    }, [])

    return wasm as WASM
}

export function useTakeEffect(fn: () => void | (() => void), deps: React.DependencyList) {
    React.useEffect(() => {
        if (deps.some((d) => !d)) return
        const destructor = fn()
        return () => {
            destructor && destructor()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
}
