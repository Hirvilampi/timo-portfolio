import React from "react";
import type { FormattedTextProps } from "@/types/embedding-types";

// tämä osio on luotu täysin tekoälyllä ChatGTP 5.4

function parseFormattedText(text: string): React.ReactNode[] {
  // 1) Lisää rivinvaihto ennen numeroalkuisia kohtia keskellä tekstiä
  //   const withBreaks = text.replace(
  //     / (\d+)\.(?=\s|[A-Za-zÅÄÖåäö])/g,
  //     "\n$1."
  //   );

  // Lisää rivinvaihto ennen numeroa vain jos sitä ei ole jo valmiiksi
  const withBreaks = text
    .replace(/(?<!\n) (\d+)\.(?=\s|[A-Za-zÅÄÖåäö])/g, "\n$1.")
    .replace(/\n{2,}/g, "\n")
    .replace(/^\n+/, "");

  // 2) Pilko teksti osiin niin, että **lihavoidut** kohdat säilyvät tunnistettavina
  const parts = withBreaks.split(/(\*\*.+?\*\*)/g);

  const nodes: React.ReactNode[] = [];

  parts.forEach((part, partIndex) => {
    // Jos osa on muotoa **teksti**
    if (/^\*\*.+\*\*$/.test(part)) {
      const boldText = part.slice(2, -2);
      nodes.push(<strong key={`b-${partIndex}`}>{boldText}</strong>);
      return;
    }

    // Muutoin käsitellään mahdolliset rivinvaihdot
    const lines = part.split("\n");

    lines.forEach((line, lineIndex) => {
      if (line) {
        nodes.push(
          <React.Fragment key={`t-${partIndex}-${lineIndex}`}>
            {line}
          </React.Fragment>,
        );
      }

      // Lisää <br /> kaikkien paitsi viimeisen rivin jälkeen
      if (lineIndex < lines.length - 1) {
        nodes.push(<br key={`br-${partIndex}-${lineIndex}`} />);
      }
    });
  });

  console.log("nodes=", nodes);
  return nodes;
}

export default function ParseTextToReact({ text }: FormattedTextProps) {
  return <span>{parseFormattedText(text)}</span>;

}
