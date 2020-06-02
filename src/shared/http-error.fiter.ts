import { ExceptionFilter, HttpException, ArgumentsHost, Catch, Logger, HttpStatus } from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter<HttpException> {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        try {
            const status = exception?.getStatus() || 500;
            const exceptionDetail = exception?.getResponse();
            const hasDefinedError = exceptionDetail['hasError'];
    
            const errors = hasDefinedError ?
            exceptionDetail['errors']: exception.message;
    
            const errorRespones = {
                status,
                errors,
            }
            
            Logger.error(
                `${JSON.stringify(exceptionDetail)}`, exception.stack, 'ExceptionFilter');
            response.status(status).json(errorRespones);
        } catch (error) {
            Logger.error(`${error} - ${exception}`);
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json('The api is died')
        }
    }
}
