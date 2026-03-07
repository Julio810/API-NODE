import { Op } from "sequelize"
import Carro from "../models/Carro.js"

class CarroService {
    async cadastrarCarro(dadosVeiculo) {
        try {
            const cadastrarVeiculos = dadosVeiculo
                .filter(v => v.chassi && v.placa)
                .map(v => ({
                    ...v,
                    chassi: v.chassi.toUpperCase(),
                    placa: Number(v.placa)
                }))

            const cadastros = await Carro.bulkCreate(cadastrarVeiculos)
            return cadastros
        } catch (error) {
            throw error
        }
    }
    async buscarCarros(filtros, page, limit) {
        try {
            const offset = (page - 1) * limit

            const where = {}
            if (filtros.chassi) {
                where.chassi = { [Op.iLike]: `%${filtros.chassi}` }
            }
            if (filtros.modelo) {
                where.modelo = { [Op.iLike]: `%${filtros.modelo}` }
            }

            const buscar = await Carro.findAndCountAll({
                where,
                offset,
                limit,
                order: [['id']]
            })

            return {
                totalPages: Math.ceil(buscar.count / limit),
                totalItens: buscar.count,
                page: page,
                data: buscar.rows
            }
        } catch (error) {
            throw error
        }
    }
    async atualizarCarros(id, dadosAtualizados) {
        try {
            const atualizar = await Carro.update(dadosAtualizados, {
                where: {
                    id: id
                }
            })

            if (atualizar === 0) {
                throw new Error('Nenhum veículo encontrado.')
            }

            return "Atualizado com sucesso"
        } catch (error) {
            throw error
        }
    }
    async deletarCarros(id) {
        try {
            const deletar = await Carro.destroy({
                where: { id: id }
            })

            if (deletar === 0) {
                throw new Error('Nenhum veículo encontrado')
            }

            return "Deletado com sucesso."
        } catch (error) {
            throw error
        }
    }
}

export default new CarroService();