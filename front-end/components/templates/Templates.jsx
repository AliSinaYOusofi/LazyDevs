"use client"
import React, { useState, useCallback } from 'react'
// Import React dependencies.
// Import the Slate editor factory.
import { createEditor } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'

const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
]

export default function Templates({text, image}) {

    const [editor] = useState(() => withReact(createEditor()));

    const renderElement = useCallback(props => {
        switch(props.element.type) {
            case 'code':
                return <CodeElement {...props} />
            default:
                return <DefaultElement {...props} />
        }
    }, [])

    return (
        <div className="w-full h-full bg-black/20 mt-10">
            <Slate editor={editor} initialValue={initialValue} >
                <Editable
                    renderElement={renderElement}
                    onKeyDown={ event => {
                        if (event.key === "&") {
                            event.preventDefault()
                            editor.insertText("and")
                        }
                    }} 
                />
            </Slate>
        </div>
    )
}


const CodeElement = props => {
    return (
        <pre {...props.attributes}>
            <code> {props.children} </code>
        </pre>
    )
}

const DefaultElement = props => {
    return <p {...props.attributes}> {props.children} </p>
}