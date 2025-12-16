import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "../users/user.entity";
import { Task } from "../tasks/task.entity";

@Entity()
export class Subject {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @ManyToOne(() => User, (user) => user.subjects, { eager: true })
  user!: User;

  @OneToMany(() => Task, (task) => task.subject)
  tasks!: Task[];
}
