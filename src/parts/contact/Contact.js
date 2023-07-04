import { useRef } from "react";
import "./Contact.css";
import contactJSON from "./Contact.json";

const Contact = () => {
  const mail = useRef("facundotabarez0@gmail.com");

  const handleMailClick = () => {
    // Not supported on all browsers
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(mail.current)
        .then(() => {
          console.log("Mail copied to clipboard");
        })
        .catch((error) => {
          console.error("Unable to copy to clipboard:", error);
        });
    }
    // Deprecated but still supported
    else {
      const textarea = document.createElement("textarea");
      textarea.value = mail.current;
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, 100); //Mobile support
      document.execCommand("copy");
      document.body.removeChild(textarea);
      console.log("Mail copied to clipboard");
    }
    alert("Copied mail to clipboard!\n(facundo.tabarez.0@gmail.com)");
  };

  const generateContactList = () => {
    let contact = [];
    for (let i = 0; i < contactJSON.length; i++) {
      if (contactJSON[i].visible) {
        contact.push(
          <li 
            className="contact-element"
            id={`contact-${contactJSON[i].id}`}
            key={`contact-${contactJSON[i].id}`}
            > 
            <a 
              href={contactJSON[i].href} 
              target={contactJSON[i].name === "Mail" ? "_self" : "_blank"}
              title={contactJSON[i].title}
              onClick={contactJSON[i].name === "Mail" ? handleMailClick : null}
            >
              <img
                id={contactJSON[i].name}
                className="contact-icon"
                src={require(`../../media/images/contact/${contactJSON[i].img}`)}
                alt={contactJSON[i].title}
              ></img>
              {contactJSON[i].name}
            </a>
          </li>
        );
      }
    }
    return contact;
  };

  return (
    <div id="contact">
      {/* <h1 className="under-construction">Under Construction</h1> */}
      <h2 id="contact-title">FIND ME</h2>
      <ul id="contact-sites-container">{generateContactList()}</ul>
    </div>
  );
};

export default Contact;
