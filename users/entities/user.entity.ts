import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    idx: number;

    @Column()
    user_id: string;

    @Column()
    user_name: string;

    @Column()
    token: string;

    @Column()
    picture: string;

    @Column()
    last_sign_in: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}
