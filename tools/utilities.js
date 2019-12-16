function inputValidation(inputs) {
  return inputs.map(function(field, index) {
    if (!field) {
      inputs[index] = null;
    }
  });
}

module.exports = inputValidation;
