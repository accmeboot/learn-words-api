import { IsString, MinLength, MaxLength } from 'class-validator';

export class UserDto {
    
    @IsString()
    @MinLength(4)
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    password: string;
}
