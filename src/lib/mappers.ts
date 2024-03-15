import { List, TableRow } from "@/types";

export const rowMapper = (rows: string[][], listName: string): TableRow[] => {
  return rows.map((row) => {
    return {
      fullName: row[1] || "",
      company: row[2] || "",
      socialMedia: row[3] || "",
      description: row[4] || "",
      listName,
    };
  });
};

export const getReadmeTable = async ({
  link,
  name,
}: List): Promise<{
  rows: TableRow[];
}> => {
  const response = await fetch(link, {
    next: {
      revalidate: 60,
      tags: ["list", name],
    },
  });

  const text = await response.text();

  const lines = text.split("\n");
  const table = lines.filter((line) => line.startsWith("|"));

  const rows = table.slice(2).map((row) =>
    row
      .split("|")
      .map((cell) => cell.trim())
      .filter((cell) => cell)
  ) as string[][];

  return {
    rows: rowMapper(rows, name),
  };
};

const socialMedias = ["twitter", "github", "linkedin", "medium"];

export const fixLinks = (description: string): string => {
  const links = description.match(/https?:\/\/[^\s]+/g);
  const markdownLinks = description.match(/\[([^\]]+)\]\(([^)]+)\)/g);
  if (!links) return description;
  links.forEach((link) => {
    const isMarkdownLink = markdownLinks?.find((mdLink) =>
      mdLink.includes(link)
    );
    if (isMarkdownLink) {
      description = description.replace(
        isMarkdownLink,
        `**${isMarkdownLink}**`
      );
      return description;
    }

    const linkText = socialMedias.find((media) => link.includes(media)) || link;
    const isEmail = link.includes("@");
    if (isEmail) {
      if (link.includes("mailto:")) return;
      description = description.replace(
        link,
        `**[${linkText}](${`mailto:${link}`})**`
      );
      return;
    }

    description = description.replace(link, `**[${linkText}](${link})**`);
  });
  return description;
};
