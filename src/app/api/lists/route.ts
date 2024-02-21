import { lists } from "@/constants";
import { getReadmeTable } from "@/lib/mappers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const list = req.nextUrl.searchParams.get("list") as string;

  if (list) {
    const selectedList = lists.find((l) => l.name === list);
    if (selectedList) {
      const response = await getReadmeTable(selectedList);
      return new Response(
        JSON.stringify({
          data: response.rows,
        }),
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
    }
  }

  const promises = lists.map((list) => getReadmeTable(list));

  const responses = await Promise.all(promises);

  const data = responses.reduce((acc, response) => {
    return {
      ...acc,
      [response.rows[0].listName]: response.rows,
    };
  }).rows;

  return new Response(
    JSON.stringify({
      data,
    }),
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
}
