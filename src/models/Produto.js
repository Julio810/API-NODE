import { DataTypes } from "sequelize";
import conn from "../db/conndb.js"

const Produto = conn.define('produto', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fabricacao: {
        type: DataTypes.DATE,
        allowNull: false
    },
    serial: {
        type: DataTypes.INTEGER,
        unique:true,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    schema: 'public',
    tableName: 'produto',
    timestamps: false
})

export default Produto;