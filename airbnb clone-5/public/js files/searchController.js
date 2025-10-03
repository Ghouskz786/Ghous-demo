let searchEngine = document.querySelector(".searchEngine");
let li = document.querySelectorAll(".li");
if (li.length !== 0) {
  searchEngine.addEventListener("input", (e) => {
    const value = e.target.value;
    li.forEach((li) => {
      const title =
        li.childNodes[3].childNodes[1].childNodes[1].childNodes[0].data.toLowerCase();
      const location =
        li.childNodes[3].childNodes[3].childNodes[0].data.toLowerCase();
      const condition = title.includes(value.toLowerCase())
        ? true
        : false || location.includes(value)
        ? true
        : false;

      condition === true
        ? li.classList.remove("hide")
        : li.classList.add("hide");
    });
  });
}
