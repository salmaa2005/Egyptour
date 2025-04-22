// pages/AlternatingLayoutPage.jsx
import React from "react";
import AlternatingSection from "../components/AlternatingSection";
import KarnakTemple from "../assets/karnak-temple.jpg";
import AbuSimbel from "../assets/abu-simbel.jpg";
import ValleyOfTheKings from "../assets/VALLEYOFTHEKINGS.jpg";
import NileCruise from "../assets/nile-cruise.jpg";
import TempleOfPhilae from "../assets/Philae-island.jpg";
import WhiteDesert from "../assets/whiteDesert.jpg";
import "./AlternatingLayoutPage.css"; // Import your CSS file
const AlternatingLayoutPage = () => {
  const sections = [
    {
      imageUrl: KarnakTemple,
      title: "Temple of Karnak (Luxor)",
      content:
        "Walk among towering columns adorned with hieroglyphs, where priests once chanted hymns to the sun god Amun-Ra",
      reverse: false,
    },
    {
      imageUrl: WhiteDesert,
      title: "White Desert",
      content:
        "Surreal chalk formations rise like alien sculptures, a silent dreamscape carved by wind and time",
      reverse: true,
    },
    {
      imageUrl: AbuSimbel,
      title: "Abu Simbel (Aswan)",
      content:
        "Ramses II’s monumental temple, carved into cliffs, guards the Nile with colossal statues that defy the desert sun",
      reverse: false,
    },
    {
      imageUrl: NileCruise,
      title: "Nile River Cruise",
      content:
        "Sail the lifeblood of Egypt—past palm-fringed shores, feluccas at sunset, and villages unchanged for centuries",
      reverse: true,
    },
    {
      imageUrl: ValleyOfTheKings,
      title: "Valley of the Kings",
      content:
        "Descend into tombs of gold and mystery, where Tutankhamun’s treasures whispered secrets for 3,000 years",
      reverse: false,
    },
    {
      imageUrl: TempleOfPhilae,
      title: "Temple of Philae (Aswan)",
      content:
        "A jewel of Isis, rescued from the Nile’s embrace, where moonlight dances on Ptolemaic pillars",
      reverse: true,
    },
  ];

  return (
    <div className="page-container">
      {sections.map((section, index) => (
        <React.Fragment key={index}>
          <AlternatingSection
            imageUrl={section.imageUrl}
            title={section.title}
            content={section.content}
            reverse={section.reverse}
          />
          {index < sections.length - 1 && <div className="separator" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default AlternatingLayoutPage;
