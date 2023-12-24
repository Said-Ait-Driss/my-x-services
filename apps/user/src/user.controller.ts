import { Controller, UseGuards, Get, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { User } from './user.entity';
import UserDto from './user.dto';
import { AuthGuard } from '../guards/AuthGuard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ role: 'user', cmd: 'get' })
  getUser(data: any): Promise<User> {
    return this.userService.findOne({ username: data.username });
  }

  @UseGuards(AuthGuard)
  @Get('greet')
  async greet(): Promise<string> {
    return 'Greetings authenticated user';
  }

  @Post('register')
  async register(@Body() data:UserDto): Promise<any> {

    let user_result = await this.userService.findOne({username: data.username })

    if(user_result){
      return {message:'user with this username already exists !'}
    }

    user_result = await this.userService.findOne({email: data.email }) 

    if(user_result){
      return {message:'user with this email already exists !'}
    }

    return this.userService.createUser(data);
  }
}
