import { Op } from "sequelize"
import Prateleira from "../models/Prateleira.js"

class PrateleiraService {
    async inserirProdutos(dadosProdutos) {
        try {
            const inserir = await Prateleira.create(dadosProdutos)

            return inserir
        } catch (error) {
            throw error
        }
    }
    async buscarProdutos(filtros, page, limit) {
        try {
            const offset = (page - 1) * limit

            const where = {}
            if (filtros.marca && filtros.marca.trim()) {
                where.marca = { [Op.iLike]: `%${filtros.marca}` }
            }
            if (filtros.produtoId && filtros.produtoId.trim()) {
                where.produtoId = { [Op.iLike]: `%${filtros.produtoId}` }
            }

            const buscar = await Prateleira.findAndCountAll({
                where,
                limit,
                offset,
                order: [['id']]
            })

            return {
                totalItens: buscar.count,
                totalPages: Math.ceil(buscar.count / limit),
                paginaAtual: page,
                data: buscar.rows
            }
        } catch (error) {
            throw error
        }
    }
    async atualizarPrateleira(id, dadosAtualizados) {
        try {
            const atualizar = await Prateleira.update(dadosAtualizados, {
                where: {
                    id: id
                }
            })

            if (atualizar === 0) {
                throw new Error('Nenhum prateleira correspondente aos filtros informados')
            }

            return "Atualizado com sucesso"
        } catch (error) {
            throw error
        }
    }
    async deletarPrateleira(id) {
        try {
            const deletar = await Prateleira.destroy({ 
                where: {
                    id: id
                }
            })

            if (deletar === 0) {
                throw new Error('Nenhum prateleira correspondente aos filtros informados')
            }

            return "Deletado com sucesso"
        } catch (error) {
            throw error
        }
    }
}

export default new PrateleiraService();