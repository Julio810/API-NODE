import { DataTypes } from "sequelize";
import conn from "../db/conndb.js"

const Empresa = conn.define('empresa', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cnpj: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    schema: 'public',
    tableName: 'empresa',
    timestamps: false
})

export default Empresa;