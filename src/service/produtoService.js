import { Op } from "sequelize"
import Produto from "../models/Produto.js"

class ProdutoService {
    async cadastrarProduto(dadosProduto) {
        try {
            const camposObrigatorios = ['nome', 'fabricacao', 'serial', 'descricao']

            const camposFaltantes = camposObrigatorios.filter(campo => !(campo in dadosProduto))

            if (camposFaltantes.length > 0) {
                throw new Error('Os seguintes dados são obrigatórios: ' + camposFaltantes.join(', '))
            }
            const cadastro = await Produto.create(dadosProduto)

            return cadastro
        } catch (error) {
            throw error
        }
    }

    async consultarProdutos(filtros, page, limit) {
        try {
            const offset = (page - 1) * limit

            const where = {}
            if (filtros.nome && filtros.nome.trim()) {
                where.nome = { [Op.iLike]: `%${filtros.nome}%` }
            }
            if (filtros.fabricacao && filtros.fabricacao.trim()) {
                where.fabricacao = { [Op.eq]: filtros.fabricacao }
            }
            if (filtros.serial !== undefined && filtros.serial !== '') {
                where.serial = Number(filtros.serial)
            }
            if (filtros.descricao && filtros.descricao.trim()) {
                where.descricao = { [Op.iLike]: `%${filtros.descricao}%` }
            }

            const consulta = await Produto.findAndCountAll({
                where,
                order: [['id', 'ASC']],
                page,
                offset
            })

            return {
                totalItens: consulta.count,
                totalPages: Math.ceil(consulta.count / limit),
                page: page,
                data: consulta.rows
            }
        } catch (error) {
            throw error
        }
    }
    async atualizarProdutos(id, dadosAtualizaods) {
        try {
            const atualizar = await Produto.update(dadosAtualizaods, {
                where: {
                    id: id
                },
                order: [['id', 'ASC']]
            })

            if (atualizar === 0) {
                throw new Error('Nenhum produto correspondente com os dados informados.')
            }

            return dadosAtualizaods
        } catch (error) {
            throw error
        }
    }
    async deletarProdutos(id) {
        try {
            const deletar = await Produto.destroy({
                where: {
                    id: id
                }
            })

            if (deletar === 0) {
                throw new Error('Nenhum produto correspondente com os dados informados.')
            }

            return "Deletado com Sucesso"
        } catch (error) {
            throw error
        }
    }
}

export default new ProdutoService();