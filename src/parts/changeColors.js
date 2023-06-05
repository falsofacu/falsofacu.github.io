const changeColors = (bgTxtColor, setTxtColor) => {
  if (bgTxtColor === "var(--color2)") {
    document.getElementById("body").style.backgroundColor = "var(--color3)";
    setTxtColor("var(--color4)");
  } else if (bgTxtColor === "var(--color4)") {
    document.getElementById("body").style.backgroundColor = "var(--color5)";
    setTxtColor("var(--color6)");
  } else {
    document.getElementById("body").style.backgroundColor = "var(--color1)";
    setTxtColor("var(--color2)");
  }
};

export default changeColors;

