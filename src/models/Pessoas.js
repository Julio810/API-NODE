import { DataTypes } from "sequelize";
import db from "../db/conndb.js"

const Pessoas = db.define('pessoa', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    schema: 'public',
    tableName: 'pessoa',
    timestamps: false
})

export default Pessoas;