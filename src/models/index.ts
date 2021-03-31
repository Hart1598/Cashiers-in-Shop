import sequelize from "../db";
import  {Model, DataTypes,Optional }  from 'sequelize';
import {ICashier, ICashRegister, IShop, IWorkingDays, Sex, Shifts, Days} from '../types';

interface ShopCreationAttributes extends Optional<IShop, 'id'> {}

export class Shop extends Model<IShop, ShopCreationAttributes> implements IShop {
    public address!: string;

    public city!: string;
    public id!: number;
    public name!: string;

    public cashRegisters?: CashRegister[];
    public cashiers?: Cashier[];


    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

interface CashierCreationAttributes extends Optional<ICashier, 'id'> {}

export class Cashier extends Model<ICashier, CashierCreationAttributes> implements ICashier {
    public age!: number;
    public fullname!: string;
    public id!: number;
    public otherJobs!: [string];
    public sex!: Sex;

    public shop_id!: number
    public working_days_id!: number
    public worksInShifts!: Shifts;
    public yearsOfExperience!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


interface WorkingDaysCreationAttributes extends Optional<IWorkingDays, 'id'> {}

export class WorkingDays extends Model<IWorkingDays, WorkingDaysCreationAttributes> implements IWorkingDays {
    public id!: number;
    public working_dates!: Date;
    public working_days!: number;
    public working_days_string!: Days;
    public CashierId!: number

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


interface CashRegisterCreationAttributes extends Optional<ICashRegister, 'id'> {}

export class CashRegister extends Model<ICashRegister, CashRegisterCreationAttributes> implements ICashRegister {
    public id!: number;
    public money!: number;
    public secretKey!: string;
    public shop_id!: number

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Shop.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: "shop",
    }
)

WorkingDays.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    working_dates: {
        type: DataTypes.DATE
    },
    working_days:{
        type: DataTypes.INTEGER
    },
    working_days_string:{
        type: DataTypes.ENUM(
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        )
    }
}, {
    sequelize,
    tableName: "working_days",
})


Cashier.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sex: {
            type: DataTypes.ENUM,
            values: ['Male','Female'],
            allowNull: false,
        },
        yearsOfExperience: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        worksInShifts: {
            type: DataTypes.ENUM,
            values: ['Night', 'Day'],
            allowNull: false,
        },
        otherJobs: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        shop_id:{
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        tableName: "cashier",
    })

CashRegister.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        money: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        secretKey: {
            type: DataTypes.STRING,
            defaultValue: 'secretKey'
        },
        shop_id:{
            type: DataTypes.INTEGER,
        }
    },
    {
        sequelize,
        tableName: "cash_register",
    })

Cashier.belongsTo(Shop, {foreignKey: 'shop_id', targetKey: 'id'})

Cashier.hasMany(WorkingDays)
WorkingDays.belongsTo(Cashier)

Shop.hasMany(CashRegister)
CashRegister.belongsTo(Shop, {foreignKey: 'shop_id', targetKey: 'id'})
