interface Table {
  schema: string;
  table: string;
}

export async function getTables(
  connectionIdentifier: string
): Promise<Table[]> {
  const url = "http://example.com/tables"; // TODO: replace with the actual API endpoint
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ connectionIdentifier }),
  });
  const data = await response.json();
  const tables = data.map((table: any) => ({
    schema: table.schema,
    table: table.table,
  }));
  return tables;
}
