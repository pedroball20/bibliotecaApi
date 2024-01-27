import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from "bcrypt";

@Injectable()
export class LoginService {
  private readonly logger = new Logger('LoginService');
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }


  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });
      await this.userRepository.save(user);
      delete user.password
      return user;

    } catch (error) {
      this.handleDbExceptions(error)
    }

  }

  async login(loginUserDto: LoginUserDto) {
    // try {
      const { password, email } = loginUserDto;

      const user = await this.userRepository.findOne({
        where: { email },
        select: { email: true, password: true }
      })

      if (!user)
        throw new UnauthorizedException('Credentials are not Valid (email)')
      if(!bcrypt.compareSync(password, user.password))
        throw new UnauthorizedException('Credentials are not Valid (password)')
      return user;

    // } catch (error) {
    //   this.handleDbExceptions(error);
    // }
  }

  private handleDbExceptions(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    console.log(error);
    throw new InternalServerErrorException('Please check server logs.')
  }
}
