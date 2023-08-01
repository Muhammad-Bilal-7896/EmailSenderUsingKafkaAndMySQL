import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Email {
  @PrimaryColumn('uuid')
  id: string; // Use 'uuid' type for the primary key

  @Column()
  to: string;

  @Column()
  subject: string;

  @Column()
  body: string;

  @Column()
  timeSent: string;

  @Column()
  emailNumber: number;

  @Column()
  numEmails: number;

  @Column()
  status: string;
}
