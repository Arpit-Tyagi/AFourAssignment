import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import {UserService} from './user.service';
import { User } from './user.entity';
import { Category } from './category.entity';
import { Expenses } from './user.expenses';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

  @Post('adduser')
  addUser(@Body() user: User): Promise<User> {
    return this.userService.postUser(user);
  }
  @Post('addCategory/:id')
  addCategory(@Body() category: Category, @Param('id') id: number ):  Promise<Category> {
    return this.userService.postCategory(category, id);
  }

  @Post('addExpenses/:id/:catid')
  addExpenses(@Body() expense: Expenses, @Param('catid') catid: number , @Param('id') id: number ): Promise<Expenses> {
    return this.userService.postExpense(id, expense, catid);
  }

  @Post('addBudget/:id/:budget')
  updateBudget(@Param('budget') budget: number, @Param('id') id: number ): Promise<Category> {
    return this.userService.updateBudget(budget, id);
  }

  @Post('userLogin')
  userLogin(@Body() user:User): Promise<User>{
    return this.userService.userLoginP(user.email, user.password);
  }

  @Get('allUser')
  getAllUser() : Promise<User[]>{
    return this.userService.getUserList();
  }

  @Get('allCategory/:id')
  getAllCategory(@Param('id') id:number) : Promise<Category[]>{
    return this.userService.getCategory(id);
  }

  @Get('getExpenses/:id/:num')
  getAllExpenses(@Param('id') id:number, @Param('num') num:number) : Promise<Expenses[]>{
    return this.userService.getExpenses(id, num);
  }
  @Get('getExpensesList/:id/:month')
  getExpensesList(@Param('id') id:number, @Param('month') month:string ) : Promise<Expenses[]>{
    return this.userService.seeExpensesList(id, month);
  }

}