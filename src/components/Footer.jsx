import "./Footer.css";

const Footer = ({
  columns = [
    {
      title: "Explore Egypt",
      links: [
        { text: "Temples & Tombs", url: "#" },
        { text: "Nile Cruises", url: "#" },
        { text: "Desert Safaris", url: "#" },
        { text: "Red Sea Diving", url: "#" },
      ],
    },
    {
      title: "Travel Info",
      links: [
        { text: "Visas & Entry", url: "#" },
        { text: "Best Time to Visit", url: "#" },
        { text: "Cultural Tips", url: "#" },
        { text: "Transportation", url: "#" },
      ],
    },
  ],
  contactInfo = {
    phoneNumbers: [
      "Cairo Office: +20 123 456 7890",
      "Luxor Office: +20 987 654 3210",
    ],
    email: "contact@egypttravel.com",
  },
  copyrightText = "© 2023 Egypt Travel Experiences. All rights reserved.",
  tagline = "Walk in the footsteps of pharaohs.",
}) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {columns.map((column, index) => (
          <div key={index} className="footer-column">
            <h3>{column.title}</h3>
            <ul>
              {column.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer-column">
          <h3>Contact</h3>
          <ul>
            {contactInfo.phoneNumbers.map((phone, index) => (
              <li key={index}>{phone}</li>
            ))}
            <li>{contactInfo.email}</li>
          </ul>
          <div className="social-links">
            <a href="#" aria-label="Facebook">
              𓃠
            </a>
            <a href="#" aria-label="Instagram">
              𓃡
            </a>
            <a href="#" aria-label="Twitter">
              𓃢
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{copyrightText}</p>
        <p>{tagline}</p>
      </div>
    </footer>
  );
};

export default Footer;
