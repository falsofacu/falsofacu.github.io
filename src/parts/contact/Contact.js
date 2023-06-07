import React from "react";
import "./Contact.css";
import mailIcon from "../../graphics/contact/envelope-solid.svg";
import githubIcon from "../../graphics/contact/github.svg";
import fccIcon from "../../graphics/contact/free-code-camp.svg";
import codepenIcon from "../../graphics/contact/codepen.svg";
import likedinIcon from "../../graphics/contact/linkedin.svg";

const Contact = () => {
    
  const handleMailClick = () => {

    const mail="facundotabarez0@gmail.com"

    // Future proof: Not supported on all browsers but execCommand is deprecated
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(mail)
        .then(() => {
          console.log('Mail copied to clipboard');
        })
        .catch((error) => {
          console.error('Unable to copy to clipboard:', error);
        });
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = mail;
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, 100); //Mobile support
      document.execCommand('copy');
      document.body.removeChild(textarea);
      console.log('Mail copied to clipboard');
    }

    alert("Copied mail to clipboard!\n(facundo.tabarez.0@gmail.com)");
  };
  // const handleLinkedInClick = () =>{};
  const handleGithubClick = () => {};
  const handleCodepenClick = () => {};
  const handleFccClick = () => {};

  return (
    <section id="contact" className="">
      {/* <h1 className="under-construction">Under Construction</h1> */}
      <h1 id="contact-title">Find me on:</h1>
      <div id="contact-sites-container">
        <a
          href="mailto:facundotabarez0@gmail.com"
          onClick={handleMailClick}
          title="facundotabarez0@gmail.com"
        >
          <img id="mail" className="contact-icon" src={mailIcon}></img>
        </a>
        {/* 
            NO LINKEDIN YET, if you got here well whatever
        <a href="https://www.linkedin.com/in/facundotabarez/" target="_blank" onClick={handleLinkedInClick}  title="in/facundotabarez/">
          <img
            id="likedin"
            className="contact-icon"
            src={likedinIcon}
            // onClick={handleLinkedInClick}
          ></img>
        </a> */}
        <a
          href="https://github.com/falsofacu"
          target="_blank"
          onClick={handleGithubClick}
          title="GitHub falsofacu"
        >
          <img id="github" className="contact-icon" src={githubIcon}></img>
        </a>
        <a
          href="https://codepen.io/falsofacu/"
          target="_blank"
          onClick={handleCodepenClick}
          title="Codepen falsofacu"
        >
          <img id="codepen" className="contact-icon" src={codepenIcon}></img>
        </a>
        <a
          href="https://www.freecodecamp.org/falsofacu"
          target="_blank"
          onClick={handleFccClick}
          title="freeCodeCap Certifications"
        >
          <img id="fcc" className="contact-icon" src={fccIcon}></img>
        </a>
      </div>
    </section>
  );
};

export default Contact;
