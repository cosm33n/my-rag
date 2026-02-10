import db from "@/db";
import { documentsTable } from "@/db/schema";

export default async function Page() {
  const documentsResponse = await db.select().from(documentsTable).limit(10);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Documents</h1>
      <ul>
        {documentsResponse.map((doc) => (
          <li key={doc.id} className="mb-2">
            <p>
              <strong>ID:</strong> {doc.id}
            </p>
            <p>
              <strong>Content:</strong> {doc.content}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
