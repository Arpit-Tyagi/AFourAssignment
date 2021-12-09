import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, MoreThan, Like } from 'typeorm';
import { Category } from './category.entity';
import { Expenses } from './user.expenses';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,

        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,

        @InjectRepository(Expenses)
        private expensesRepository: Repository<Expenses>
      ) {}

      getUserList(): Promise<User[]>{
          return this.usersRepository.find();
      }
      getAllCategory(): Promise<Category[]>{
        return this.categoryRepository.find();
    }
    getCategory(id:number): Promise<Category[]>{
        return this.categoryRepository.find({ where: {  user: id } });
    }
    userLoginP(em:string, pass:string ): Promise<User>{
      return this.usersRepository.findOne({  where: {email: em, password: pass} });
  }
    postUser( data: User ): Promise<User> {
        return this.usersRepository.save(data);
      }

      async postCategory( dataCat: Category, id : number ): Promise<Category> {
      
      dataCat.user = await this.usersRepository.findOne(({ where: {  id: id } }));
        return this.categoryRepository.save(dataCat);
      }

      async postExpense( id:number, data: Expenses, catid: number ): Promise<Expenses> {
        data.user = await this.usersRepository.findOne(({ where: {  id: id } }));
        data.category = await this.categoryRepository.findOne(({ where: {  id: catid } }));
        return this.expensesRepository.save(data);
      }

      async updateBudget( budget: number, id : number ): Promise<Category> {
        const cat  = await this.categoryRepository.findOne(({ where: {  id: id } }));
            cat.Budget = budget;
          return this.categoryRepository.save(cat);
        }

      getExpenses( id:number, num:number): Promise<Expenses[]>{
        return this.expensesRepository.find({where: {user : id }})
      }
      async getExpensesList( id:number, date : string ): Promise<number>{
        date = "%"+date+"%";
        const cat = await this.expensesRepository.find({where: {user : id , date : Like(date) }})
        var sum = 0;
        cat.forEach(item => sum=item.amount+sum);
        return sum;
      }
       seeExpensesList( id:number, date : string ): Promise<Expenses[]>{
        date = "%"+date+"%";
        return this.expensesRepository.find({where: {category : id , date : Like(date) }});
      }


}
