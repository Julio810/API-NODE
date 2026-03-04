import { DataTypes } from "sequelize";
import conn from "../db/conndb.js"

const Prateleira = conn.define('prateleira', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    produtoId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Ou false, dependendo da sua regra de negócio
        references: {
            model: 'produto', // Nome da tabela no banco
            key: 'id'
        }
    }
}, {
    schema: 'public',
    tableName: 'prateleira',
    timestamps: false
})

export default Prateleira;