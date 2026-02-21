import Pessoas from "./Pessoas.js"
import Trabalho from "./Trabalho.js"
import Empresa from "./Empresa.js"

Empresa.hasMany(Pessoas, { foreignKey: 'empresaId' })
Pessoas.belongsTo(Empresa, { foreignKey: 'empresaId' })

Trabalho.hasMany(Pessoas, { foreignKey: 'trabalhoId' })
Pessoas.belongsTo(Trabalho, { foreignKey: 'trabalhoId'})

export { Empresa, Trabalho, Pessoas };