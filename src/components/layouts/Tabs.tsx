"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface IListTabs {}

export default function ListTabs({}: IListTabs) {
  return (
    <div>
      <Button asChild variant={"default"}>
        <Link href="/">All</Link>
      </Button>
      <Button asChild variant={"ghost"}>
        <Link href="/">All</Link>
      </Button>
      <Tabs defaultValue="all" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
