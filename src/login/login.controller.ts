import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateUserDto, LoginUserDto } from './dto';


@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.loginService.create(createUserDto);
  }
 
  @Post('auth')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.loginService.login(loginUserDto);
  }

}
