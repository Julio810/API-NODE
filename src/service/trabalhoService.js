import { where, Op } from "sequelize"
import Trabalho from "../models/Trabalho.js"

class TrabalhoService {
    async cadastrarProfissao(dadosProfissao) {
        try {
            const dadosObrigatorios = ['profissao', 'ramo']

            const camposObrigatorios = dadosObrigatorios.filter(campo => !(campo in dadosProfissao))

            if (camposObrigatorios.length > 0) {
                throw new Error('Você não está passando o(s) seguinte(s) dados: ' + camposObrigatorios.join(', '))
            }

            const profissao = await Trabalho.create(dadosProfissao)

            return dadosProfissao

        } catch (error) {
            throw error
        }
    }
    async consultarProfissoes(filtros, page = 1, limit = 10) {
        try {
            const offset = (page - 1) * limit
            const where = {}

            if (filtros.profissao && filtros.profissao.trim() !== '') {
                where.profissao = { [Op.iLike]: `%${filtros.profissao}%` }
            }

            if (filtros.ramo && filtros.ramo.trim() !== '') {
                where.ramo = { [Op.iLike]: `%${filtros.ramo}%` }
            }

            const consulta = await Trabalho.findAndCountAll({
                where,
                limit,
                offset,
                order: [['id']]
            })

            if (consulta.length === 0) {
                throw new Error('Nenhuma profissão encontrada para esses filtros.')
            }

            return {
                totalItems: consulta.count,
                páginaAtual: page,
                totalPéginas: Math.ceil(consulta.count / limit),
                dados: consulta.rows
            }
        } catch (error) {
            throw error
        }
    }
    async atualizarProfissao(id, dadosAtualizados) {
        try {
            const [atualizar] = await Trabalho.update(dadosAtualizados, {
                where: { id: id }
            })

            if (atualizar === 0) {
                throw new Error('Nenhuma Profissão correspondente com os dados informados.')
            }

            return dadosAtualizados
        } catch (error) {
            throw error
        }
    }
    async deletarProfissao(id) {
        try {
            const deletar = await Trabalho.destroy({
                where: { id: id }
            })

            if (deletar === 0) {
                throw new Error('Nenhuma Profissão correspondente com os dados informados.')
            }

            return "Deletado com Sucesso"

        } catch (error) {
            throw error
        }
    }
}

export default new TrabalhoService();