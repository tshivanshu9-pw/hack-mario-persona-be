import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isString,
  isNotEmpty,
  maxLength,
  minLength,
} from 'class-validator';

export function IsPassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsPassword',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(password: string, args: ValidationArguments) {
          password = password.trim();
          if (!isNotEmpty(password)) return false; //todo: throw specific error
          if (!isString(password)) return false;
          if (!minLength(password, 6)) return false;

          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return `password is not valid`;
        },
      },
    });
  };
}
