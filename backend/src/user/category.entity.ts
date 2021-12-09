import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Expenses } from './user.expenses';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Name: string;


  @Column({ default: 1000 })
   Budget: number;

  @ManyToOne(() => User, user => user.category, {
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})
  user: User;

  @OneToMany(() => Expenses, expense => expense.category, {
    cascade: true
})
  expense: Expenses[];


}