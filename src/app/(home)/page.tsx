import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/ui/data-table/columns";
import { lists } from "@/constants";
import { List, TableRow } from "@/types";
import type { Metadata } from "next";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Link, Rocket } from "lucide-react";

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

  const renderList = (list: List) => {
    return (
      <a href={list.repoLink} target="_blank" rel="noreferrer" key={list.name}>
        <Alert>
          <Link className="h-4 w-4 !text-blue-500" />
          <AlertTitle>{list.title}</AlertTitle>
        </Alert>
      </a>
    );
  };

  const renderLists = () => {
    return lists.map(renderList);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full md:container mx-auto">
      <div className="w-full">
        <DataTable data={data} columns={columns} />
      </div>
      <Separator className="my-4" />
      <div className="w-full py-3">
        <h2 className="text-2xl font-bold text-center pb-3">Listeler</h2>
        <span className="flex items-center justify-center text-center gap-4 flex-col lg:flex-row">
          Katkıda bulunmak için listelere göz atabilir, PR oluşturarak listeye
          bilgilerinizi ekleyebilirsiniz.
          <Rocket className="text-orange-600" />
        </span>
        <Separator className="my-4" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {renderLists()}
        </div>
      </div>
    </div>
  );
}
