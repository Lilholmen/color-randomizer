const background = document.querySelector('#container');
const gen = document.querySelector('.generate-area__color');
//const result = document.querySelector('#res');

const rangesHSL = document.querySelectorAll('.input__range--hsl');
const rangesRGB = document.querySelectorAll('.input__range--rgb');
const labelsHSL = document.querySelectorAll('.settings__label--hsl');
const labelsRGB = document.querySelectorAll('.settings__label--rgb');

const settingsHSL = {
  hue: document.querySelector('#hue').value,
  saturation: document.querySelector('#saturation').value,
  lightness: document.querySelector('#lightness').value,
};

const settingsRGB = {
  red: document.querySelector('#red').value,
  green: document.querySelector('#green').value,
  blue: document.querySelector('#blue').value,
};

labelsHSL.forEach((label, index) => {
  label.textContent = rangesHSL[index].value;
});

labelsRGB.forEach((label, index) => {
  label.textContent = rangesRGB[index].value;
});

rangesHSL.forEach((range, index) => {
  range.addEventListener('input', () => {
    labelsHSL[index].textContent = range.value;
    background.style.backgroundColor = generateColorHSL();
    gen.textContent = calculateResultColor();
  });
});

rangesRGB.forEach((range, index) => {
  range.addEventListener('input', () => {
    labelsRGB[index].textContent = range.value;
    background.style.backgroundColor = generateColorRGB();
    gen.textContent = calculateResultColor();
    fontColorChanger(
      +rangesRGB[0].value + +rangesRGB[1].value + +rangesRGB[2].value
    );
  });
});

document.querySelector('.generate-area').addEventListener('click', () => {
  background.style.backgroundColor = generateColorRGB();
});

function generateColorHSL() {
  return `hsl(${rangesHSL[0].value}, ${rangesHSL[1].value}%, ${rangesHSL[2].value}%)`;
}

function generateColorRGB() {
  return `rgb(${rangesRGB[0].value}, ${rangesRGB[1].value}, ${rangesRGB[2].value})`;
}

function changeBackGroundColor() {
  background.style.backgroundColor = `hsl{${settingsHSL.hue}, ${settingsHSL.saturation}%, ${settingsHSL.lightness}%}`;
}

function calculateResultColor() {
  let color = background.style.backgroundColor;
  color = color
    .slice(4, -1)
    .split(', ')
    .map((el) => complementColorCode(el))
    .join('');

  return '#' + color;
}

function complementColorCode(code) {
  let temp = Number(code).toString(16).toUpperCase();

  return temp.length === 2 ? temp : '0' + temp;
}

function fontColorChanger(colorSum) {
  const diff = 765 - colorSum;

  if (diff < 205) {
    gen.style.color = `rgb(${50 + diff},${50 + diff},${50 + diff})`;
  } else {
    gen.style.color = '#fff';
  }
}
