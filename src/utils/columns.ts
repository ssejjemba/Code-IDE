interface Column {
  name: string;
  type: string;
}

interface TableWithColumns {
  schema: string;
  table: string;
  columns: Column[];
}

export async function getTableColumns(
  connectionId: number,
  schema: string,
  table: string
): Promise<TableWithColumns | null> {
  const url = "http://example.com/columns"; // replace with the actual API endpoint
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ connectionId, schema, table }),
  });
  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  const columns = data.columns.map((column: any) => ({
    name: column.name,
    type: column.type,
  }));
  return {
    schema: data.schema,
    table: data.table,
    columns,
  };
}
