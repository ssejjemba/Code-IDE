import { IRange, languages } from "monaco-editor";
import SQL from "../data/sql"; // assuming data is exported from a separate file

export function provideCompletionItems(
  range: IRange
): languages.CompletionItem[] {
  const completionItems: languages.CompletionItem[] = [];

  // Add keywords
  SQL.keywords.forEach((keyword) => {
    const item: languages.CompletionItem = {
      label: keyword,
      kind: languages.CompletionItemKind.Keyword,
      insertText: keyword,
      range,
    };
    completionItems.push(item);
  });

  // Add functions
  SQL.builtinFunctions.forEach((func) => {
    const item: languages.CompletionItem = {
      label: func,
      kind: languages.CompletionItemKind.Function,
      insertText: func,
      range,
    };
    completionItems.push(item);
  });

  // Add variables
  SQL.builtinVariables.forEach((variable) => {
    const item: languages.CompletionItem = {
      label: variable,
      kind: languages.CompletionItemKind.Variable,
      insertText: variable,
      range,
    };
    completionItems.push(item);
  });

  // Add operators
  SQL.operators.forEach((operator) => {
    const item: languages.CompletionItem = {
      label: operator,
      kind: languages.CompletionItemKind.Operator,
      insertText: operator,
      range,
    };
    completionItems.push(item);
  });

  return completionItems;
}
