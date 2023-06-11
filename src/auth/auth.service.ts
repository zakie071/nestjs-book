import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { createUserDto } from './user-dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './user-dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(signUpDto: createUserDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    let user;

    try {
      user = await this.userModel.findOne({ email });

      if (user) {
        throw new UnauthorizedException('User already registered');
      }

      user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
      });
    } catch (error) {
      throw error;
    }

    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });
    // console.log('This is ', user.password);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }
    

    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }
}
