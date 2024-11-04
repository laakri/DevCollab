import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '../../mailer/mailer.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async register(registerDto: RegisterDto): Promise<any> {
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }
    console.log(registerDto);
    const user = this.userRepository.create(registerDto);
    await this.userRepository.save(user);

    this.sendVerificationEmail(user);

    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
      select: [
        'id',
        'email',
        'password',
        'username',
        'role',
        'isEmailVerified',
      ],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await user.validatePassword(loginDto.password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }

    if (!user.isEmailVerified) {
      throw new UnauthorizedException('Email not verified');
    }

    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async sendVerificationEmail(user: User) {
    const verificationToken = this.jwtService.sign(
      { userId: user.id },
      { expiresIn: '24h' },
    );
    const verificationUrl = `http://localhost:5173/verify-email?token=${verificationToken}`;

    await this.mailerService.sendEmail(
      user.email,
      'Welcome to DevCollab - Verify Your Email',
      verificationUrl,
    );
  }

  async verifyEmail(token: string): Promise<void> {
    try {
      const decoded = this.jwtService.verify(token);

      const user = await this.userRepository.findOne({
        where: { id: decoded.userId },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      user.isEmailVerified = true;
      console.log('Updated user:', user);

      const savedUser = await this.userRepository.save(user);
      console.log('Saved user:', savedUser);

      return;
    } catch (error) {
      console.error('Verification error:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid or expired verification token');
    }
  }

  async sendWelcomeEmail(userEmail: string): Promise<void> {
    await this.mailerService.sendEmail(
      userEmail,
      'Welcome',
      'Thanks for joining our platform!',
    );
  }
}
