import { DataTypes } from "sequelize";
import conn from "../db/conndb.js"

const Motocicletas = conn.define('motocicletas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    chassi: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    placa: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
    },
    fabricacao: {
        type: DataTypes.DATE,
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    modelo: {
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
    }
}, {
    schema: 'public',
    tableName: 'motocicletas',
    timestamps: false
})

export default Motocicletas;