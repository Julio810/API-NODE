import { where } from "sequelize"
import Pessoas from "../models/Pessoas.js"

class PessoasService {
    async cadastrarPessoas(dadosCadastro) {
        try {
            const criarPessoa = await Pessoas.create(dadosCadastro)

            return criarPessoa

        } catch (error) {
            throw Error(error)
        }
    }

    async consultarPessoas(filtros = {}, limit, offset) {
        try {
            const consultarPessoas = await Pessoas.findAll({ 
                order: [['id', 'ASC']],
                where: filtros,
                limit: limit,
                offset: offset
             })

            return consultarPessoas

        } catch (error) {
            throw Error(error)
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
            throw Error(error)
        }
    }
    async deletarPessoas(id) {
        try {
            const deletarDados = await Pessoas.destroy({
                where: { id: id }
            })

            return "Deletado com Sucesso"
            
        } catch (error) {
            throw Error(error)
        }
    }
}

export default new PessoasService();