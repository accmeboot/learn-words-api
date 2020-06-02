import { IsString, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class AddWordDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    definition: string;

    @IsString({
        each: true
    })

    @IsOptional()
    examples?: string[];

    @IsString({
        each: true
    })
    @IsOptional()
    translations?: string[];
}
