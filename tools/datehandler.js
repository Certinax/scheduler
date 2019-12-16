function dateConverter(date) {
  if (date) {
    return date.toISOString().slice(0, 10);
  }
  return;
}

module.exports = dateConverter;
