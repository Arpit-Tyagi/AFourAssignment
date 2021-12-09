import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { Expenses } from './user.expenses';

@Entity()

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  income: number;

  @OneToMany(() => Category, cateogory => cateogory.user, {
    cascade: true
})
  category: Category[];

  @OneToMany(() => Expenses, expense => expense.user, {
    cascade: true
})
  expense: Expenses[];

}