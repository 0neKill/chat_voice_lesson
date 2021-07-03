import {Column, DataType, HasOne, Model, Table} from "sequelize-typescript";
import {CodeEntity} from "../code/code.entity";

interface TUserEntityCreationAttributes {
    gitId: number,
    fullName: string,
    avatarUrl: string,
    userName: string | null,
}

@Table({tableName: 'user'})
export class UserEntity extends Model<UserEntity, TUserEntityCreationAttributes> {

    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
    id: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    gitId: number

    @Column({type: DataType.STRING, allowNull: false})
    fullName: string;

    @Column({type: DataType.STRING, allowNull: false})
    avatarUrl: string;

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    isActive: boolean;

    @Column({type: DataType.STRING, allowNull: true})
    userName: string;

    @Column({type: DataType.STRING, allowNull: true})
    phone: string


    @HasOne(()=>CodeEntity)
    code:CodeEntity
}