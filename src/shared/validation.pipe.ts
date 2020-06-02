import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
      if (value instanceof Object && this.isEmpty(value)) {
          throw new HttpException(
              {
                hasError: true,
                errors: [{
                  property: 'Unknown',
                  messages: ['No body submitted']
                }]
              },
              HttpStatus.BAD_REQUEST
          );
      }
      
      if (!metatype || !this.toValidate(metatype)) {
        return value;
      }

      const object = plainToClass(metatype, value);
      const errors = await validate(object);
      
      if (errors.length > 0) {
        throw new HttpException(
          this.formatErrors(errors),
          HttpStatus.BAD_REQUEST
        );
      }

      return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  public formatErrors(errors: any[]) {
    const errorsDetail = errors.map((err) => {
      const combinedErrors = Object.keys(err.constraints).map((key) => err.constraints[key]);

      return {
        field: err.property || 'Unknow property',
        messages: combinedErrors, 
      }

  });

    return {
      hasError: true,
      errors: errorsDetail
    }
  }

  private isEmpty(value: any) {
    if (Object.keys(value).length > 0) {
        return false;
    }

    return true;
  }
}
