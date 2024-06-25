import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Cat } from './cat.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('cat')
  createCat(): Promise<Cat> {
    return this.appService.createCat({ name: "Meo", age: 15, color: "white" });
  }
}
