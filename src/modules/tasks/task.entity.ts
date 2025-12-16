import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../users/user.entity";
import { Subject } from "../subjects/subject.entity";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  deadline!: string;

  @Column()
  status!: string;

  @ManyToOne(() => Subject, (subject) => subject.tasks, { eager: true })
  subject!: Subject;

  @ManyToOne(() => User, (user) => user.tasks, { eager: true })
  user!: User;
}
