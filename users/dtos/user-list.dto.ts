import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class UserListDto {
    @Transform((params) => {
        params.value = +params.value;

        if (isNaN(params.value) || params.value < 1) {
            params.value = 1;
        }
        return params.value;
    })
    @IsNumber()
    public readonly page: number = 1;

    @IsString()
    public readonly search_keyword: string = '';
}
