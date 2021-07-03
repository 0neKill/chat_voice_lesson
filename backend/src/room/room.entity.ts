import {Column, DataType, Model, Table} from "sequelize-typescript";

interface TRoomEntityCreationAttributes {
    title: string,
    speakers: string,
    listenerCount?: number
}

@Table({tableName: 'room'})
export class RoomEntity extends Model<RoomEntity, TRoomEntityCreationAttributes> {
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING, allowNull: false})
    title: string;
    @Column({type: DataType.JSON, allowNull: false})
    speakers: string;
    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 0})
    listenerCount: number;
}