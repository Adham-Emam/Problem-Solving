let num = document.querySelector('[type="number"]'),
  eleText = document.querySelector('[type="text"]');

let submit = document.querySelector('[type="submit"]');

let results = document.querySelector('[class="results"]');

document.forms[0].onsubmit = function (event) {
  event.preventDefault();
  if (eleText.value && num.value) {
    for (i = 1; i <= num.value; i++) {
      let newDiv = document.createElement("div");
      newDiv.setAttribute("class", "box");
      newDiv.setAttribute("title", "element");
      newDiv.setAttribute("id", `id-${i}`);
      newDiv.append(eleText.value);
      results.append(newDiv);
    }
  } else {
    console.log("Input is Empty");
  }
};
