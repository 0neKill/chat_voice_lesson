import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {UserEntity} from "../user/user.entity";

interface TCodeEntityCreationAttributes {
    code: number,
    userId: number
}

@Table({tableName: 'code'})
export class CodeEntity extends Model<CodeEntity, TCodeEntityCreationAttributes> {

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: string;

    @Column({type: DataType.INTEGER, allowNull: false, unique: true})
    code: number;

    @ForeignKey(() => UserEntity)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

    @BelongsTo(() => UserEntity)
    user: UserEntity
}

