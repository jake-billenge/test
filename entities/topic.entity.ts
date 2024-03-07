import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'topics' })
export class TopicEntity {
    @PrimaryGeneratedColumn()
    idx: number;

    @Column()
    topic_id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    allow_duplicates: string;

    @Column()
    choice_type: string;

    @Column()
    topic_from: string;

    @Column()
    topic_until: Date;

    @Column()
    status: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    handler_idx: number;
}
