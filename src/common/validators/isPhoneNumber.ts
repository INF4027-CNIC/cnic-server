import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class PhoneNumberConstraint implements ValidatorConstraintInterface {
  validate(phoneNumber: string, args: ValidationArguments) {
    // regular expression to match phone number with the format 677109790
    const phoneRegex = /^6[^0-4]\d{7}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const { property } = args;
    return `property ${property} should be a 9 digits number starting with 6 and the second digit should not be 0, 1, 2, 3, or 4.`;
  }
}

export function IsPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: PhoneNumberConstraint,
    });
  };
}
