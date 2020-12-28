import React from "react"
import { useCrate, useTakeEffect } from "./wasm"

const App = () => {
    const [text, setText] = React.useState("")
    const lib = useCrate()
    useTakeEffect(() => {
        const hello = lib.greet("User")
        setText(hello)
    }, [lib])
    return <div>{text || "NNNNN"}</div>
}

export default App
