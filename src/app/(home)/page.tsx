import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/ui/data-table/columns";
import { TableRow } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Turkish Developers",
  description: "Türk geliştiricilerin buluşma noktası",
};

const getDevelopers = async () => {
  const response = await fetch(`${process.env.API_URL}/lists`);
  const data = await response.json();
  return data as { data: TableRow[] };
};

export default async function Page() {
  const { data } = await getDevelopers();

  return (
    <div className="container">
      <div className="w-full">
        <DataTable data={data} columns={columns} />
      </div>
    </div>
  );

  return <div className="container"></div>;
}
