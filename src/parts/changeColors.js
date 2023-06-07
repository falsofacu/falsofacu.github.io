const changeColors = (bgTxtColor, setTxtColor, clicked = 0) => {

  //Prevents bug when clicking twice too fast
  if (clicked === 2) {
    document.getElementById("body").style.backgroundColor = "var(--color1)";
    document.getElementById("root").style.backgroundColor = "var(--color1)";
  }
  else if (bgTxtColor === "var(--color2)") {
    document.getElementById("body").style.backgroundColor = "var(--color3)";
    document.getElementById("root").style.backgroundColor = "var(--color3)";
    setTxtColor("var(--color4)");
  } else if (bgTxtColor === "var(--color4)") {
    document.getElementById("body").style.backgroundColor = "var(--color5)";
    document.getElementById("root").style.backgroundColor = "var(--color5)";
    setTxtColor("var(--color6)");
  } else {
    console.log("First else: " + clicked);
    if (clicked < 2) {
      document.getElementById("body").style.backgroundColor = "var(--color1)";
      document.getElementById("root").style.backgroundColor = "var(--color1)";
      setTxtColor("var(--color2)");
    } else {
      console.log("Second else: " + clicked);
      if (bgTxtColor === "var(--color6)") {
        document.getElementById("body").style.backgroundColor = "var(--color7)";
        document.getElementById("root").style.backgroundColor = "var(--color7)";
        setTxtColor("var(--color8)");
      } else {
        console.log("Third else: " + clicked);
        document.getElementById("body").style.backgroundColor = "var(--color1)";
        document.getElementById("root").style.backgroundColor = "var(--color1)";
        setTxtColor("var(--color2)");
      }
    }
  }
};

export default changeColors;
