import Motocicletas from "../models/motocicletas.js"
import { Op, where } from "sequelize"

class MotocicletasService {
    async cadastrarMotocicleta(dadosMotocicleta) {
        try {
            const cadastrarVeiculos = dadosMotocicleta
                .filter(v => v.chassi && v.placa)
                .map(v => ({
                    ...v,
                    chassi: v.chassi.toUpperCase(),
                    placa: Number(v.placa)
                }))

            const listaChassis = cadastrarVeiculos.map(v => v.chassi)
            const listaPlacas = cadastrarVeiculos.map(v => v.placa)

            const chassisUnicos = new Set(listaChassis)
            const placasUnicas = new Set(listaPlacas)

            if (chassisUnicos.size !== listaChassis.length || placasUnicas.size !== listaPlacas.length) {
                throw new Error("A lista enviada contém chassis ou placas repetidos entre si.")
            }

            const dados = await Motocicletas.findAll({
                where: {
                    [Op.or]: [
                        { chassi: { [Op.in]: listaChassis } },
                        { placa: { [Op.in]: listaPlacas } }
                    ]
                },
                attributes: ['chassi', 'placa']
            })

            if (dados.length > 0) {
                const chassisDuplicados = dados
                    .filter(c => listaChassis.includes(c))
                    .map(e => e.chassi)

                const placasDuplicadas = dados
                    .filter(p => listaPlacas.includes(p))
                    .map(e => e.placa)

                if (chassisDuplicados.length > 0) {
                    throw new Error(`Chassis já existentes: ${chassisDuplicados.join(', ')}`)
                }

                if (placasDuplicadas.length > 0) {
                    throw new Error(`Placas já existentes: ${placasDuplicadas.join(', ')}`)
                }
            }

            const cadastros = await Motocicletas.bulkCreate(cadastrarVeiculos)
            return cadastros
        } catch (error) {
            throw error
        }
    }
    async buscarMotocicletas(filtros, page, limit) {
        try {
            const offset = (page - 1) * limit

            const where = {}
            if (filtros.marca && filtros.marca.trim()) {
                where.marca = { [Op.iLike]: `%${filtros.marca}` }
            }
            if (filtros.modelo && filtros.modelo.trim()) {
                where.modelo = { [Op.iLike]: `%${filtros.modelo}` }
            }
            if (filtros.cor && filtros.cor.trim()) {
                where.cor = { [Op.iLike]: `%${filtros.cor}` }
            }

            const busca = await Motocicletas.findAndCountAll({
                where,
                offset,
                limit,
                order: [['id']]
            })

            return {
                totalItens: busca.count,
                totalPages: Math.ceil(busca.count / limit),
                page: page,
                data: busca.rows
            }
        } catch (error) {
            throw error
        }
    }
    async atualizarMotocicleta(id, dadosAtualizados) {
        try {
            const atualizar = await Motocicletas.update(dadosAtualizados, {
                where: {
                    id: id
                }
            })

            if (atualizar === 0) {
                throw new Error('Nenhum motocicleta encontrada')
            }

            return "Atualizado com sucesso"
        } catch (error) {
            throw error
        }
    }
    async deletarMotocicleta(id) {
        try {
            const deletar = await Motocicletas.destroy({
                where: {
                    id: id
                }
            })

            if (atualizar === 0) {
                throw new Error('Nenhuma motocicleta encontrada')
            }

            return "Deletado com sucesso"
        } catch (error) {
            throw error
        }
    }
}

export default new MotocicletasService();