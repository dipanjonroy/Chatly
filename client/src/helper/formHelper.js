const EmailRegx = /\S+@\S+\.\S+/;
const OnlyNumberRegx = /^-?[0-9]+(?:\.[0-9]+)?$/;
const MobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

class FormHelper {
  isEmpty(value) {
    return value === null || value === undefined || value.length === 0;
  }

  isEmail(value) {
    return EmailRegx.test(value);
  }
}
const formHelper = new FormHelper();

export const { isEmpty, isEmail } = formHelper;
