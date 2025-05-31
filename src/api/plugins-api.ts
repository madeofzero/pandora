// TODO: Figure out auth
import { SERVER_URL } from "@/api";

export async function fetchPlugins(siteId: string) {
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

export async function createPlugin(body: any) {
  return await fetch(`${SERVER_URL}/api/collections/plugins/records`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
