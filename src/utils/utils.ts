export const units = [
  {label: 'kg', factor: 1000},
  {label: 'g', factor: 1},
  {label: 'mg', factor: 0.001},
];

export const weighFormatter = (val: number): string => {
  let formattedVal = val;
  let unitLabel = 'mg';
  for (const unit of units) {
    if (Math.abs(val) >= unit.factor) {
      formattedVal = val / unit.factor;
      unitLabel = unit.label;
      break;
    }
  }
  return `${formattedVal.toFixed(3).replace('.', ',')} ${unitLabel}`;
};
