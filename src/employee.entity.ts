/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ContactInfo } from './contact-info.entity';
import { Task } from './tesk.entity';
import { Meeting } from './meeting.entity';
import { ManyToMany } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Employee, (employee) => employee.directReports, {
    onDelete: 'SET NULL',
  })
  manager: Employee;

  @OneToMany(() => Employee, (employee) => employee.manager)
  directReports: Employee[];

  @OneToOne(() => ContactInfo, (contactinfo) => contactinfo.employee) //so it can reference the other table
  contactInfo: ContactInfo; //its bidirectional

  @OneToMany(() => Task, (task) => task.employee)
  task: Task[];

  @ManyToMany(() => Meeting, (meeting) => meeting.attendees) //Many to Many cascades by default
  @JoinTable() //employee can own a meeting but a meeting cannot own a employee
  meetings: Meeting[];
}
