let usd = document.querySelector("[name='dollar']");
let egp = document.querySelector('[name="egp"]');

usd.onkeyup = function () {
  egp.value = (usd.value * 19.66).toFixed(2);
};

egp.onkeyup = function () {
  usd.value = (egp.value / 19.66).toFixed(2);
};
