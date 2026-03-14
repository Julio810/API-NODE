import { Op } from "sequelize"
import Carro from "../models/Carro.js"

class CarroService {
    async cadastrarCarro(dadosVeiculo) {
        try {
            const listaOriginal = Array.isArray(dadosVeiculo) ? dadosVeiculo : [dadosVeiculo]

            // Validação interna
            const { potenciaisValidos, erros, chassiSet, placasSet } = listaOriginal.reduce((acc, v, index) => {
                const { chassi, placa } = v
                const item = index + 1

                if (!chassi || !placa) {
                    acc.erros.push({ item, erro: "Campos obrigatórios ausentes", dados: v })
                    return acc
                }

                const chassiUpper = chassi.toUpperCase()
                const placaNumber = Number(placa)

                // Validar duplicidade na lista enviada
                if (acc.chassiSet.has(chassiUpper) || acc.placasSet.has(placaNumber)) {
                    const motivo = acc.chassiSet.has(chassiUpper) ? "Chassi" : "Placa"
                    acc.erros.push({ item, erro: `${motivo} duplicado na lista enviada` })
                } else {
                    acc.chassiSet.add(chassiUpper)
                    acc.placasSet.add(placaNumber)
                    acc.potenciaisValidos.push({ ...v, chassi: chassiUpper, placa: placaNumber })
                }

                return acc
            }, { potenciaisValidos: [], erros: [], chassiSet: new Set(), placasSet: new Set() })

            // Retornar os erros, se nada for validado
            if (potenciaisValidos.length === 0) return { erros, cadastrarFinal: [] }

            // Buscar no Banco
            const dados = await Carro.findAll({
                where: {
                    [Op.or]: [
                        { chassi: { [Op.in]: Array.from(chassiSet) } },
                        { placa: { [Op.in]: Array.from(placasSet) } }
                    ]
                },
                attributes: ['chassi', 'placa']
            })

            const cadastro = potenciaisValidos.filter(v => {
                const conflito = dados.find(b => b.chassi === v.chassi || b.placa === v.placa)

                if (conflito) {
                    erros.push({
                        erro: conflito.chassi === v.chassi ? "Chassi já cadastrado" : "Placa já cadastrada",
                        dados: v
                    })
                    return false
                }
                return true
            })

            if (cadastro.length > 0) {
                await Carro.bulkCreate(cadastro)
            }

            return {
                cadastro,
                erros
            }

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
    async atualizarCarros(dadosAtualizados) {
        try {
            const listaOriginal = Array.isArray(dadosAtualizados) ? dadosAtualizados : [dadosAtualizados]
            const erros = []
            const processar = []

            const dados = listaOriginal.map(v => v.id).filter(Boolean)

            const buscarDados = await Carro.findAll({
                where: {
                    [Op.or]: [
                        { id: { [Op.in]: dados } },
                        { chassi: { [Op.in]: listaOriginal.map(v => v.chassi).filter(Boolean) } },
                        { placa: { [Op.in]: listaOriginal.map(v => v.placa).filter(Boolean) } }
                    ]
                }
            })

            const idsExistentes = new Set(buscarDados.map(c => c.id))

            listaOriginal.forEach((v, index) => {
                // Verifica se o ID foi enviado e existe no Banco
                if (!v.id || !idsExistentes.has(v.id)) {
                    erros.push({
                        item: v.id || index + 1,
                        erro: "Veículo não encontrado.",
                        dados: v
                    })
                    return
                }

                // Verifica se novo chassi/placa já pertence a outro carro
                const conflito = buscarDados.find(b =>
                    b.id !== v.id && (b.chassi === v.chassi || b.placa === v.placa)
                )

                if (conflito) {
                    erros.push({
                        erro: conflito.chassi === v.chassi ? "Chassi já cadastrado." : "Placa já cadastrada.",
                        dados: v
                    })
                    return
                }

                processar.push(v)
            })

            const resultado = []

            if (processar.length > 0) {
                await Promise.all(processar.map(async (veiculo) => {
                    await Carro.update(veiculo, {
                        where: { id: veiculo.id }
                    })
                    resultado.push(veiculo)
                }))
            }

            return {
                data: resultado,
                erros: erros
            }
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