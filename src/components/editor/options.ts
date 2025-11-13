import { editor } from "monaco-editor";

export const options: editor.IStandaloneEditorConstructionOptions = {
  fontSize: 15,
  fontFamily: "Fira Code",
  fontLigatures: true,
  minimap: { enabled: false },
  contextmenu: false,
  roundedSelection: true,
  padding: { bottom: 0, top: 16, right: 0, left: 0 },
  formatOnPaste: true,
  smoothScrolling: true,
  automaticLayout: true,
  "bracketPairColorization.enabled": false,
  "semanticHighlighting.enabled": true,
  suggest: {
    showFields: false,
    showFunctions: false,
    showKeywords: false,
    showSnippets: false,
    showReferences: false,
  },
} as editor.IStandaloneEditorConstructionOptions;
