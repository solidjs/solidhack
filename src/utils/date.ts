// Helper function to format date to SQLite DATETIME format
export function formatDateForSQLite(date: Date): string {
  return date.toISOString().replace("T", " ").split(".")[0];
}

// Helper function to get current date in EST
export function getCurrentESTDate(): Date {
  const now = new Date();
  const estOffset = -5 * 60; // EST is UTC-5
  return new Date(now.getTime() + estOffset * 60 * 1000);
}
