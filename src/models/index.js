import Pessoas from "./Pessoas.js"
import Trabalho from "./Trabalho.js"
import Empresa from "./Empresa.js"
import Produto from "./Produto.js"
import Prateleira from "./Prateleira.js"

Empresa.hasMany(Pessoas, { foreignKey: 'empresaId' })
Pessoas.belongsTo(Empresa, { foreignKey: 'empresaId' })

Trabalho.hasMany(Pessoas, { foreignKey: 'trabalhoId' })
Pessoas.belongsTo(Trabalho, { foreignKey: 'trabalhoId'})

Prateleira.hasMany(Produto, { foreignKey: 'produtoId'})
Produto.belongsTo(Prateleira, { foreignKey: 'produtoId'})

export { Empresa, Trabalho, Pessoas, Prateleira, Produto };