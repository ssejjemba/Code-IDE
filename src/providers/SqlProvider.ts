import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { getTables } from "../api/table";
import { getTableColumns } from "../api/columns";

export async function sqlCompletionProvider(
  model: monaco.editor.ITextModel,
  position: monaco.Position
): Promise<monaco.languages.ProviderResult<monaco.languages.CompletionList>> {
  // Set the connection identifier. In your actual application, this value would come from user input.
  const connectionIdentifier = "123";

  // Get the word at the current position of the editor
  const wordUntilPosition = model.getWordUntilPosition(position);

  // Define the trigger characters that will activate the auto-complete suggestion
  const triggerCharacters = [".", "["];

  // If the current word ends with a trigger character, then suggest table and column names
  if (
    wordUntilPosition &&
    (wordUntilPosition.word.endsWith(".") ||
      wordUntilPosition.word.endsWith("["))
  ) {
    // Get the list of tables for the current connection identifier
    const tables = await getTables(connectionIdentifier);

    // For each table, get its columns and create a completion item object with the table name and its columns as children
    const suggestions = tables.map(async (table) => {
      // Get the columns for the current table
      const tableWithColumns = await getTableColumns(
        Number(connectionIdentifier),
        table.schema,
        table.table
      );

      // If the table does not have columns (e.g. it could not be retrieved from the database), then return null
      if (!tableWithColumns) {
        return null;
      }

      // Create a completion item for each column of the table
      const columnSuggestions = tableWithColumns.columns.map((column) => ({
        label: column.name,
        kind: monaco.languages.CompletionItemKind.Field,
        insertText: column.name,
        range: new monaco.Range(
          position.lineNumber,
          wordUntilPosition.startColumn,
          position.lineNumber,
          wordUntilPosition.endColumn
        ),
      }));

      // Create a completion item for the table and add its columns as children
      return {
        label: `${table.schema}.${table.table}`,
        kind: monaco.languages.CompletionItemKind.Class,
        insertText: `${table.schema}.${table.table}`,
        range: new monaco.Range(
          position.lineNumber,
          wordUntilPosition.startColumn,
          position.lineNumber,
          wordUntilPosition.endColumn
        ),
        children: columnSuggestions,
      };
    });

    // Return the list of completion items
    return {
      suggestions: (await Promise.all(
        suggestions
      )) as monaco.languages.CompletionItem[],
    };
  } else {
    // If the current word does not end with a trigger character, then do not suggest anything
    return {
      suggestions: [],
    };
  }
}
