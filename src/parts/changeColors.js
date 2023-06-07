const changeColors = (bgTxtColor, setTxtColor, clicked = 0) => {

  //I could make this with less code but it's more readable this way

  if (clicked <= 2) {
    if (bgTxtColor === "var(--color2)") {
      document.getElementById("body").style.backgroundColor = "var(--color3)";
      document.getElementById("root").style.backgroundColor = "var(--color3)";
      setTxtColor("var(--color4)");
    } else if (bgTxtColor === "var(--color4)") {
      document.getElementById("body").style.backgroundColor = "var(--color5)";
      document.getElementById("root").style.backgroundColor = "var(--color5)";
      setTxtColor("var(--color6)");
    } else {
      document.getElementById("body").style.backgroundColor = "var(--color1)";
      document.getElementById("root").style.backgroundColor = "var(--color1)";
      setTxtColor("var(--color2)");
    }
  } else {
    if (bgTxtColor === "var(--color2)") {
      document.getElementById("body").style.backgroundColor = "var(--color7)";
      document.getElementById("root").style.backgroundColor = "var(--color7)";
      setTxtColor("var(--color8)");
    } else if (bgTxtColor === "var(--color8)") {
      document.getElementById("body").style.backgroundColor = "var(--color3)";
      document.getElementById("root").style.backgroundColor = "var(--color3)";
      setTxtColor("var(--color4)");
    } else if (bgTxtColor === "var(--color4)") {
      document.getElementById("body").style.backgroundColor = "var(--color5)";
      document.getElementById("root").style.backgroundColor = "var(--color5)";
      setTxtColor("var(--color6)");
    } else {
      document.getElementById("body").style.backgroundColor = "var(--color1)";
      document.getElementById("root").style.backgroundColor = "var(--color1)";
      setTxtColor("var(--color2)");
    }
  }
};

export default changeColors;
