// email.entity.ts
import { UUID } from 'crypto';
import { Entity, Column, PrimaryColumn, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Email {
  @PrimaryColumn('uuid')
  id: string; // Use 'uuid' type for the primary key

  @Column()
  to: string;

  @Column()
  subject: string;

  @Column()
  text: string;

  @Column()
  html: string;

  @Column()
  timeSent: string;

  @Column()
  emailNumber: number;

  @Column()
  numEmails: number;

  @Column()
  status: string;
}
