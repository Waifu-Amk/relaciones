import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { ContactInfo } from './contact-info.entity';
import { Meeting } from './meeting.entity';
import { Task } from './tesk.entity';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World';
  }
  constructor(
    @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
    @InjectRepository(ContactInfo) private contactRepo: Repository<ContactInfo>,
    @InjectRepository(Meeting) private meetingRepo: Repository<Meeting>,
    @InjectRepository(Task) private TaskRepo: Repository<Task>,
  ) {}

  async seed() {
    //create employee 1
    const ceo = this.employeeRepo.create({ name: 'CEO' });
    await this.employeeRepo.save(ceo);

    const ceoContactInfo = this.contactRepo.create({
      email: 'email@email.com',
    });
    ceoContactInfo.employee = ceo;
    await this.contactRepo.save(ceoContactInfo);

    //create employee 2 manager
    const manager = this.employeeRepo.create({
      name: 'Kevin',
      manager: ceo,
    });

    const task1 = this.TaskRepo.create({ name: 'Hire' });
    await this.TaskRepo.save(task1);
    const task2 = this.TaskRepo.create({ name: 'Present to CEO' });
    await this.TaskRepo.save(task2);

    manager.task = [task1, task2];

    const meeting1 = this.meetingRepo.create({ zoomUrl: 'meeting.com' });
    meeting1.attendees = [ceo];
    await this.meetingRepo.save(meeting1);

    manager.meetings = [meeting1];

    await this.employeeRepo.save(manager);
  }
}
