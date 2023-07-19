import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsString({ message: 'Missed password' })
  password: string;

  @IsString({ message: 'Missed name' })
  name: string;
}
