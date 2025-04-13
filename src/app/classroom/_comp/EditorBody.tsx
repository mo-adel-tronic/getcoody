'use client'

import { Editor, Monaco } from "@monaco-editor/react"
import { Dispatch, SetStateAction, useRef } from "react"
import * as monaco from "monaco-editor"

type Props = {
  fileContent: Record<string, string>,
  setFileContent: Dispatch<SetStateAction<Record<string, string>>>,
  activeFile: string | null,
  onEnterKey?: () => Promise<void>,
}

export default function EditorBody({fileContent, setFileContent, activeFile, onEnterKey}: Props) {
    const editorRef = useRef<Monaco | null>(null)
    const onMount = (editor: any, monaco: Monaco) => {
      if (editor) {
        editorRef.current = monaco
        editor.focus()

        editor.onKeyDown((event: monaco.IKeyboardEvent) => {
          if (event.code === "Enter") {
            console.log("Enter key pressed");
            if (onEnterKey) {
              onEnterKey();
            }
          }
        });
      }
    }
  return (
    <Editor 
    theme="vs-dark" 
    height={'50vh'} 
    defaultLanguage="dart" 
    defaultValue="// start code here" 
    value={fileContent[activeFile || '']}
    onChange={(value) => {
        const data = {...fileContent}
        data[activeFile||''] = value || ''
        setFileContent(data) 
    }}
    onMount={onMount}
    />
  )
}