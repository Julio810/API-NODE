import { DataTypes } from "sequelize";
import conn from "../db/conndb.js"

const Carro = conn.define('carro', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    chassi: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    placa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    }
}, {
    schema: 'public',
    tableName: 'carro',
    timestamps: false
})

export default Carro;