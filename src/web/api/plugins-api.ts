import { SERVER_URL } from "@/web/api";
// TODO: Figure out auth

export async function fetchPlugins(siteId: string) {
  if (siteId.length <= 0) {
    return [];
  }
  const searchParams = new URLSearchParams();
  searchParams.set("filter", `property.id="${siteId}"`);

  const result = await fetch(
    `${SERVER_URL}/api/collections/plugins/records` +
      "?" +
      searchParams.toString(),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return await result.json();
}

export async function createPlugin(body: {
  property: string | null;
  type: string;
  attributes: Record<string, string>;
}) {
  if (body.property) {
    return (
      await fetch(`${SERVER_URL}/api/collections/plugins/records`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
  }
  return { ...body, id: Math.random() };
}
