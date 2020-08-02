const { cpf, cnpj } = require('cpf-cnpj-validator');

module.exports = {
  validCpfCnpj(type, value) {
    return type === 'PF' ? cpf.isValid(value) : cnpj.isValid(value);
  },
};
