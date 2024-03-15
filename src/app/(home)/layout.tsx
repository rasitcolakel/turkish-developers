import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return <div className="w-full p-3 flex flex-col">{children}</div>;
}
