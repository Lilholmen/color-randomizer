const background = document.querySelector('#container');
const ranges = document.querySelectorAll('.input__range');
const labels = document.querySelectorAll('.settings__label');
const gen = document.querySelector('.generate-area');

const settings = {
  hue: document.querySelector('#hue').value,
  saturation: document.querySelector('#saturation').value,
  lightness: document.querySelector('#lightness').value,
};

labels.forEach((label, index) => {
  label.textContent = ranges[index].value;
});

ranges.forEach((range, index) => {
  range.addEventListener('input', () => {
    labels[index].textContent = range.value;
    background.style.backgroundColor = temp();
  });
});

gen.addEventListener('click', () => {
  background.style.backgroundColor = temp();
});

function temp() {
  return `hsl(${ranges[0].value}, ${ranges[1].value}%, ${ranges[2].value}%)`;
}

function changeBackGroundColor() {
  background.style.backgroundColor = `hsl{${settings.hue}, ${settings.saturation}%, ${settings.lightness}%}`;
}
