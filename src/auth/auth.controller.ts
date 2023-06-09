import { Body, Controller, Post, Get, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDto } from './user-dto/create-user.dto';
import { LoginDto } from './user-dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: createUserDto): Promise<{ token: string }> {
    return this.userService.createUser(signUpDto);
  }

  @Put('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.userService.login(loginDto);
  }
}
