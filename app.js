const background = document.querySelector('#container');
const gen = document.querySelector('.generate-area__color');

const rangesHSL = document.querySelectorAll('.input__range--hsl');
const rangesRGB = document.querySelectorAll('.input__range--rgb');
const labelsHSL = document.querySelectorAll('.settings__label--hsl');
const labelsRGB = document.querySelectorAll('.settings__label--rgb');

let RGB = {
  red: +document.querySelector('#red').value,
  green: +document.querySelector('#green').value,
  blue: +document.querySelector('#blue').value,
};

let HSL = {
  hue: +document.querySelector('#hue').value,
  saturation: +document.querySelector('#saturation').value,
  lightness: +document.querySelector('#lightness').value,
};

onStart();

function onStart() {
  background.style.backgroundColor = changeBackgrounColor(RGB);

  gen.textContent = calculateResultColor();

  labelsHSL.forEach((label, index) => {
    label.textContent = rangesHSL[index].value;
  });

  labelsRGB.forEach((label, index) => {
    label.textContent = rangesRGB[index].value;
  });
}

function onChange(colorModel, rangeIndex, value) {
  if (colorModel === 'rgb') {
    labelsRGB[rangeIndex].textContent = value;
    RGB[event.target.id] = +value;
  } else if (colorModel === 'hsl') {
    labelsHSL[rangeIndex].textContent = value;
    HSL[event.target.id] = +value;
    RGB = convertHSLtoRGB(HSL.hue, HSL.saturation, HSL.lightness);
    //rangesRGB.forEach((range) => (range.value = RGB[range.id]));
    //labelsRGB.forEach((label) => (label.textContent = RGB[label.id]));
  }

  changeBackgrounColor(RGB);
  gen.textContent = calculateResultColor();
}

rangesHSL.forEach((range, index) => {
  range.addEventListener('input', () => onChange('hsl', index, range.value));
});

rangesRGB.forEach((range, index) => {
  range.addEventListener('input', () => onChange('rgb', index, range.value));
});

document.querySelector('.generate-area').addEventListener('click', () => {
  background.style.backgroundColor = generateColorRGB();
});

function changeBackgrounColor(currentColor) {
  background.style.backgroundColor = `rgb(${currentColor.red},${currentColor.green},${currentColor.blue})`;
}

function generateColorHSL() {
  return `hsl(${rangesHSL[0].value}, ${rangesHSL[1].value}%, ${rangesHSL[2].value}%)`;
}

function generateColorRGB() {
  return `rgb(${rangesRGB[0].value}, ${rangesRGB[1].value}, ${rangesRGB[2].value})`;
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

function convertHSLtoRGB(h, s, l) {
  let r, g, b;

  [s, l] = [s / 100, l / 100];

  if (s === 0) {
    r = g = b = l;
  } else {
    if (h === 360) {
      h = 0;
    }

    const C = 1 - Math.abs(2 * l - 1) * s;
    const X = C * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - C / 2;

    r = g = b = m;

    if (h < 60) {
      r += C;
      g += X;
    } else if (h < 120) {
      r += X;
      g += C;
    } else if (h < 180) {
      g += C;
      b += X;
    } else if (h < 240) {
      g += X;
      b += C;
    } else if (h < 300) {
      r += X;
      b += C;
    } else if (h < 360) {
      r += C;
      b += X;
    }
  }

  return {
    red: Math.round(r * 255),
    green: Math.round(g * 255),
    blue: Math.round(b * 255),
  };
}
