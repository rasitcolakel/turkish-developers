import Tabs from "@/components/layouts/Tabs";
import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <div>
      <Tabs />
      {children}
    </div>
  );
}
