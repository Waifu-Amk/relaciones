/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class ContactInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  phone: string;

  @Column()
  email: string;

  @Column()
  employeeId: number; //its implicit in the join column but this benefits form querying by contactInfo to the employee table


  @OneToOne(() => Employee, (employee) => employee.contactInfo, {
    onDelete: 'CASCADE', //when it delets an employee it automatically deletes its related info
  }) //returns a type Employee
  @JoinColumn() //tells where is the relationship id created (foriegn key)
  employee: Employee;
}
