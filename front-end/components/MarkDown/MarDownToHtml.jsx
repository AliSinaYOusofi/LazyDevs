import React from 'react'
import Markdown from 'markdown-to-jsx'

export default function MarDownToHtml({content}) {
    return (
        <div className="editor">
            <Markdown>{content}</Markdown>
        </div>
    )
}
