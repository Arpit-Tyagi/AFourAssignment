import { Entity, Column, PrimaryGeneratedColumn,  ManyToOne } from 'typeorm';
import { Category } from './category.entity';
import { User } from './user.entity';

@Entity()

export class Expenses {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: "date" })
  date: Date;

  @Column()
  amount: number;

  @ManyToOne(type => User, user => user.expense, {
    onDelete: 'CASCADE'
})
  user: User;

  @ManyToOne(type => Category, category => category.expense, {
    onDelete: 'CASCADE' , eager : true
})
  category: Category;



}