import { List } from "@/types";

export const ListLabels = {
  goDevelopers: "Go",
  frontendDevelopers: "Frontend",
  nodeJsDevelopers: "Node.js",
};

export const lists: List[] = [
  {
    name: "goDevelopers",
    link: "https://raw.githubusercontent.com/yakuter/go-developer-list/main/README.md",
    title: ListLabels.goDevelopers,
  },
  {
    name: "frontendDevelopers",
    link: "https://raw.githubusercontent.com/yakuter/frontend-developler-list/main/README.md",
    title: ListLabels.frontendDevelopers,
  },
  {
    name: "nodeJsDevelopers",
    link: "https://raw.githubusercontent.com/yakuter/nodejs-developer-list/main/README.md",
    title: ListLabels.nodeJsDevelopers,
  },
];
