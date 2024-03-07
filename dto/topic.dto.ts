import { ArrayMinSize, IsEnum, IsNotEmpty, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { StringBoolean } from '@src/common/types/enum';
import { BadRequestException } from '@nestjs/common';
import * as dayjs from 'dayjs';

@ValidatorConstraint()
export class ValidDate implements ValidatorConstraintInterface {
    public async validate(date, args: ValidationArguments) {
        if (dayjs(args.object['topic_from']).isValid() === false) {
            throw new BadRequestException('시작 날짜가 유효한 날짜가 아닙니다.');
        }

        if (dayjs(args.object['topic_until']).isValid() === false) {
            throw new BadRequestException('종료 날짜는 유효한 날짜가 아닙니다.');
        }

        if (args.object['topic_from'] > args.object['topic_until']) {
            throw new BadRequestException('시작 날짜는 종료 날짜보다 클 수 없습니다.');
        }

        return true;
    }
}

@ValidatorConstraint()
export class ChoiceArray implements ValidatorConstraintInterface {
    public async validate(choices: Choice[], args: ValidationArguments) {
        for (const choice of choices) {
            if (!choice.choice_text) {
                throw new BadRequestException('보기 항목를 입력해주세요.');
            }

            if (!choice.color) {
                throw new BadRequestException('보기 색을 입력해주세요.');
            }

            if (choice.color.length < 3 || choice.color.length > 6) {
                throw new BadRequestException('색상은 3-6자리로 입력해주세요.');
            }
        }

        return true;
    }
}
export class Choice {
    @IsNotEmpty({ message: '보기를 입력해주세요.' })
    public readonly choice_text: string;

    @IsNotEmpty({ message: '색을 입력해주세요.' })
    public readonly color: string;
}

export class TopicDto {
    @IsNotEmpty({ message: '주제명을 입력해주세요.' })
    public readonly name: string;

    @IsNotEmpty({ message: '설명을 입력해주세요.' })
    public readonly description: string;

    @IsEnum(Object.values(StringBoolean), { message: '중복여부는 불가/가능만 가능합니다.' })
    @IsNotEmpty({ message: '중복여부를 선택해주세요.' })
    public readonly allow_duplicates: string;

    @IsEnum(Object.values(['OX', 'M']), { message: '유형은 텍스트형/OX형만 가능합니다.' })
    @IsNotEmpty({ message: '유형을 선택해주세요.' })
    public readonly choice_type: string;

    @IsNotEmpty({ message: '시작 날짜를 입력해주세요.' })
    public readonly topic_from: string;

    @Validate(ValidDate)
    @IsNotEmpty({ message: '종료 날짜를 입력해주세요.' })
    public readonly topic_until: string;

    @IsEnum(Object.values(['H', 'S']), { message: '상태는 노출/숨김만 가능합니다.' })
    @IsNotEmpty({ message: '상태를 선택해주세요.' })
    public readonly status: string;

    @Validate(ChoiceArray)
    @ArrayMinSize(2, { message: '보기 항목은 최소 2개입니다.' })
    public readonly choices: Choice[];
}
