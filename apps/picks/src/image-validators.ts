// custom-validators.ts
import { registerDecorator, ValidationOptions, ValidationArguments , isObject } from 'class-validator';

export function IsImage(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsImage',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
            if (!isObject(value) || !('originalname' in value) || !('mimetype' in value)) {
                return false;
              }
              const {  mimetype } = value;
              const allowedMimeTypes = ['image/jpg','image/jpeg', 'image/png'];

              return allowedMimeTypes.includes(mimetype as string);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} should be image.`;
        },
      },
    });
  };
}
