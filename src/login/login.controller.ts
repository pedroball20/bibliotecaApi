import { Controller, Get, Post, Body, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Auth, GetUser, RawHeaders } from './decorators';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces';



@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.loginService.create(createUserDto);
  }

  @Post('auth')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.loginService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[],
  ) {
    console.log({ user: request.user })
    return {
      ok: true,
      message: 'Hola mundo ',
      user,
      userEmail,
      rawHeaders
    }
  }

  @Get('private2')
  // @SetMetadata('roles', ['publicador'])
  @RoleProtected(ValidRoles.user)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(
    @GetUser() user: User,
  ) {
    return {
      ok: true,
      user,
    }
  }
  
  @Get('private3')
  @Auth(ValidRoles.publicador)
  privateRoute3(
    @GetUser() user: User,
  ) {
    return {
      ok: true,
      user,
    }
  }


}
