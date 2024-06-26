import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Category extends BaseEntity {
    @Column({ type: 'varchar', length: 500 })
    name: string

    @Column({ type: "varchar", length: 500 })
    description: string
}