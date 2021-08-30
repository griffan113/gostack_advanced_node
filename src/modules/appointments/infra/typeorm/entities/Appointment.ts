import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  provider_id: string;

  // Coluna virtualizada
  @ManyToOne(() => User)
  // Indica qual coluna dentro da entidade faz o relacionamento
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column()
  user_id: string;

  // Coluna virtualizada
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
