import { DataTypes } from "sequelize";
import db from "../db/conndb.js"

const Trabalho = db.define('trabalho', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    profissao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ramo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    schema: 'public',
    tableName: 'trabalho',
    timestamps: false
})

export default Trabalho;