import React from 'react'
import {createRoot} from 'react-dom/client'
import {App} from './components/App'

if (process.env.NODE_ENV !== "production") {
    new EventSource('/esbuild').addEventListener('change', () => {
        location.reload()
    })
}

function getRootElement() {
    const div = document.createElement('div')
    div.id = 'root'
    document.body.appendChild(div)

    return div
}

document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot(getRootElement())
    root.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    )
})
