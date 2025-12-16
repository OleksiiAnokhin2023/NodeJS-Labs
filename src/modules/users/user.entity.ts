import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Task } from "../tasks/task.entity";
import { Subject } from "../subjects/subject.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string; // добавляем ! чтобы TS не ругался на неинициализированное поле

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Subject, (subject) => subject.user)
  subjects!: Subject[];

  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[];
}
