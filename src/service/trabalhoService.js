import { where } from "sequelize"
import Trabalho from "../models/Trabalho.js"

class TrabalhoService {
    async cadastrarProfissao(dadosProfissao) {
        try {
            const profissao = await Trabalho.create(dadosProfissao)

            return dadosProfissao

        } catch (error) {
            throw Error(error)
        }
    }
    async consultarProfissoes() {
        try {
            const consulta = await Trabalho.findAll({ order: [['id']] })

            return consulta
        } catch (error) {
            throw Error(error)
        }
    }
    async atualizarProfissao(id, dadosAtualizados) {
        try {
            const atualizar = await Trabalho.update(dadosAtualizados, {
                where: { id: id }
            })

            return dadosAtualizados
        } catch (error) {
            throw Error(error)
        }
    }
    async deletarProfissao(id) {
        try {
            const deletar = await Trabalho.destroy({
                where: { id: id }
            })

            return "Deletado com Sucesso"

        } catch (error) {
            throw Error(error)
        }
    }
}

export default new TrabalhoService();