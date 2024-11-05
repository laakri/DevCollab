import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Query,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.usersService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    await this.usersService.verifyEmail(token);
    return { message: 'Email verified successfully!' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('settings')
  async getSettings(@Request() req) {
    return this.usersService.getSettings(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post('settings')
  async updateSettings(
    @Request() req,
    @Body() updateSettingsDto: UpdateSettingsDto,
  ) {
    return this.usersService.updateSettings(req.user.sub, updateSettingsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return this.usersService.getProfile(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  async updateProfile(
    @Request() req,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(req.user.sub, updateProfileDto);
  }
}
