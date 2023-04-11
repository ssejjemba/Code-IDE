import { Editor } from "@monaco-editor/react";
import "./App.css";
// @ts-ignore
import { Range, languages } from "monaco-editor";
import { LoadingOverlay } from "@mantine/core";
import { provideCompletionItems } from "./providers/SqlProvider";

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
          monaco.languages.registerCompletionItemProvider("sql", {
            provideCompletionItems: (model, position) => {
              const suggestions: languages.CompletionItem[] = [];

              // Get the text before the current cursor position
              const textUntilPosition = model.getValueInRange({
                startLineNumber: position.lineNumber,
                startColumn: 1,
                endLineNumber: position.lineNumber,
                endColumn: position.column,
              });

              // Get the last word before the current cursor position
              const matches = textUntilPosition.match(/[a-z_]*$/i);
              const lastWord = matches ? matches[0] : "";

              // Provide completion suggestions based on the last word
              if (lastWord.length > 0) {
                const wordInfo = model.getWordAtPosition(position);
                const range = new Range(
                  position.lineNumber,
                  wordInfo?.startColumn || position.column,
                  position.lineNumber,
                  wordInfo?.endColumn || position.column
                );
                suggestions.push(...provideCompletionItems(range));
              }

              return { suggestions };
            },
          });
        }}
        loading={<LoadingOverlay visible />}
      />
    </div>
  );
}

export default App;
