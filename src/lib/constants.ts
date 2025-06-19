// src/lib/constants.ts

export type Unit = {
  name: string;
  factor: number; // Коэффициент конвертации относительно базовой единицы
};

export type Category = {
  name: string;
  baseUnit: string;
  units: Record<string, Unit>;
};

export const UNIT_DATA: Record<string, Category> = {
  length: {
    name: "Length",
    baseUnit: "meter",
    units: {
      meter: { name: "Meters", factor: 1 },
      kilometer: { name: "Kilometers", factor: 1000 },
      centimeter: { name: "Centimeters", factor: 0.01 },
      millimeter: { name: "Millimeters", factor: 0.001 },
      inch: { name: "Inches", factor: 0.0254 },
      foot: { name: "Feet", factor: 0.3048 },
      yard: { name: "Yards", factor: 0.9144 },
      mile: { name: "Miles", factor: 1609.34 },
    },
  },
  mass: {
    name: "Mass/Weight",
    baseUnit: "kilogram",
    units: {
      kilogram: { name: "Kilograms", factor: 1 },
      gram: { name: "Grams", factor: 0.001 },
      milligram: { name: "Milligrams", factor: 1e-6 },
      ton: { name: "Metric Tons", factor: 1000 },
      pound: { name: "Pounds", factor: 0.453592 },
      ounce: { name: "Ounces", factor: 0.0283495 },
    },
  },
  volume: {
    name: "Volume",
    baseUnit: "liter",
    units: {
      liter: { name: "Liters", factor: 1 },
      milliliter: { name: "Milliliters", factor: 0.001 },
      'cubic-meter': { name: "Cubic Meters", factor: 1000 },
      'us-gallon': { name: "US Gallons", factor: 3.78541 },
      'us-quart': { name: "US Quarts", factor: 0.946353 },
      'us-pint': { name: "US Pints", factor: 0.473176 },
      'us-cup': { name: "US Cups", factor: 0.24 },
      'us-fl_oz': { name: "US Fluid Ounces", factor: 0.0295735 },
    },
  },
  area: {
    name: "Area",
    baseUnit: "square-meter",
    units: {
      'square-meter': { name: "Square Meters", factor: 1 },
      'square-kilometer': { name: "Square Kilometers", factor: 1e6 },
      'square-centimeter': { name: "Square Centimeters", factor: 1e-4 },
      hectare: { name: "Hectares", factor: 10000 },
      'square-mile': { name: "Square Miles", factor: 2.59e6 },
      'square-yard': { name: "Square Yards", factor: 0.836127 },
      'square-foot': { name: "Square Feet", factor: 0.092903 },
      'square-inch': { name: "Square Inches", factor: 0.00064516 },
      acre: { name: "Acres", factor: 4046.86 },
    },
  },
  speed: {
    name: "Speed",
    baseUnit: "meter-per-second",
    units: {
      'meter-per-second': { name: "Meters per second", factor: 1 },
      'kilometer-per-hour': { name: "Kilometers per hour", factor: 0.277778 },
      'mile-per-hour': { name: "Miles per hour", factor: 0.44704 },
      knot: { name: "Knots", factor: 0.514444 },
    },
  },
  time: {
    name: "Time",
    baseUnit: "second",
    units: {
      second: { name: "Seconds", factor: 1 },
      millisecond: { name: "Milliseconds", factor: 0.001 },
      minute: { name: "Minutes", factor: 60 },
      hour: { name: "Hours", factor: 3600 },
      day: { name: "Days", factor: 86400 },
      week: { name: "Weeks", factor: 604800 },
    },
  },
  digital: {
    name: "Digital Data",
    baseUnit: "byte",
    units: {
      byte: { name: "Bytes", factor: 1 },
      kilobyte: { name: "Kilobytes (1024)", factor: 1024 },
      megabyte: { name: "Megabytes (1024)", factor: 1048576 },
      gigabyte: { name: "Gigabytes (1024)", factor: 1073741824 },
      terabyte: { name: "Terabytes (1024)", factor: 1099511627776 },
      bit: { name: "Bits", factor: 0.125 },
    },
  },
  pressure: {
    name: "Pressure",
    baseUnit: "pascal",
    units: {
      pascal: { name: "Pascals", factor: 1 },
      kilopascal: { name: "Kilopascals", factor: 1000 },
      bar: { name: "Bars", factor: 100000 },
      psi: { name: "PSI", factor: 6894.76 },
      atm: { name: "Atmospheres", factor: 101325 },
    },
  },
  energy: {
    name: "Energy",
    baseUnit: "joule",
    units: {
      joule: { name: "Joules", factor: 1 },
      kilojoule: { name: "Kilojoules", factor: 1000 },
      kilocalorie: { name: "Kilocalories", factor: 4184 },
      'kilowatt-hour': { name: "Kilowatt-hours", factor: 3.6e6 },
    },
  },
  temperature: {
    name: "Temperature",
    baseUnit: "celsius", // Базовая единица условна, т.к. логика особая
    units: {
      celsius: { name: "Celsius", factor: 1 },
      fahrenheit: { name: "Fahrenheit", factor: 1 },
      kelvin: { name: "Kelvin", factor: 1 },
    },
  },
};