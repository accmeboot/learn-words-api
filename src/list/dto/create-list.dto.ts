import { IsString, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateListDto {
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    group: string;

    @IsUUID('all', { each: true })
    words: string[];
}
