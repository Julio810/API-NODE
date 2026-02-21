import { where, Op } from "sequelize"
import Pessoas from "../models/Pessoas.js"

class PessoasService {
    async cadastrarPessoas(dadosCadastro) {
        try {
            const dadosObrigatorios = ['nome', 'idade', 'email', 'cpf']

            const camposFaltantes = dadosObrigatorios.filter(campo => !(campo in dadosCadastro))

            if (camposFaltantes.length > 0) {
                throw new Error('Você não está passando o(s) seguinte(s) dado(s): ' + camposFaltantes.join(', '))
            }

            const criarPessoa = await Pessoas.create(dadosCadastro)

            return criarPessoa

        } catch (error) {
            throw error
        }
    }

    async consultarPessoas(filtros, page, limit) {
        try {
            const offset = (page - 1) * limit

            const where = {}
            if (filtros.nome && filtros.nome.trim() !== '') {
                where.nome = { [Op.iLike]: `%${filtros.nome}%` }
            }
            if (filtros.idade !== undefined && filtros.idade !== '') {
                where.idade = Number(filtros.idade)
            }
            if (filtros.email && filtros.email.trim() !== '') {
                where.email = { [Op.iLike]: `%${filtros.email}%` }
            }
            if (filtros.cpf && filtros.cpf.trim() !== '') {
                where.cpf = { [Op.iLike]: `%${filtros.cpf}%` }
            }

            const consultarPessoas = await Pessoas.findAndCountAll({
                where,
                order: [['id', 'ASC']],
                limit,
                offset
            })

            return {
                totalItens: consultarPessoas.count,
                paginaAtual: page,
                totalPaginas: Math.ceil(consultarPessoas.count / limit),
                dados: consultarPessoas.rows
            }

        } catch (error) {
            throw error
        }
    }

    async atualizarPessoas(id, dadosAtualizados) {
        try {
            const atualizarDados = await Pessoas.update(dadosAtualizados, {
                where: { id: id }
            })

            return {
                dadosAtualizados
            }

        } catch (error) {
            throw error
        }
    }
    async deletarPessoas(id) {
        try {
            const deletarDados = await Pessoas.destroy({
                where: { id: id }
            })

            return "Deletado com Sucesso"

        } catch (error) {
            throw error
        }
    }
}

export default new PessoasService();