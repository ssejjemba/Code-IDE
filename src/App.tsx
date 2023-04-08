import { Editor } from "@monaco-editor/react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Editor
        height="100%"
        defaultLanguage="sql"
        theme="vs-dark"
        onMount={(editor, monaco) => {
          monaco.editor.defineTheme("dark", {
            base: "vs-dark",
            inherit: true,
            colors: {
              "editor.background": "#011627",
              "editor.foreground": "#a7dbf7",
              "editor.inactiveSelectionBackground": "#7e57c25a",
              "editor.hoverHighlightBackground": "#0c4994",
              "editor.lineHighlightBackground": "#0c499477",
              "editor.selectionBackground": "#103362",
              "editor.selectionHighlightBackground": "#103362",
              "editor.findMatchHighlightBackground": "#103362",
              "editor.rangeHighlightBackground": "#103362",
              "editor.wordHighlightBackground": "#103362",
              "editor.wordHighlightStrongBackground": "#103362",
            },
            rules: [],
          });

          monaco.editor.setTheme("dark");
        }}
      />
    </div>
  );
}

export default App;
