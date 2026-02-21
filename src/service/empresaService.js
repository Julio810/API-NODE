import { Op, where } from 'sequelize'
import Empresa from "../models/Empresa.js"

class EmpresaService {
    async cadastrarEmpresa(dadosEmpresa) {
        try {
            const camposObrigatorios = ['nome', 'estado', 'cnpj']

            const camposFaltantes = camposObrigatorios.filter(campo => !(campo in dadosEmpresa))

            if (camposFaltantes > 0) {
                throw new Error(`Você não está passando o(s) seguinte(s) dado(s): ` + camposFaltantes.join(', '))
            }

            const cadastro = await Empresa.create(dadosEmpresa)

            return dadosEmpresa
        } catch (error) {
            throw error
        }
    }
    async consultarEmpresa(filtros, page, limit) {
        try {
            const offset = (page - 1) * limit

            const where = {}
            if (filtros.nome && filtros.nome.trim()) {
                where.nome = { [Op.iLike]: `%${filtros.nome}` }
            }
            if (filtros.estado && filtros.estado.trim()) {
                where.estado = { [Op.iLike]: `%${filtros.estado}` }
            }
            if (filtros.cnpj && filtros.cnpj.trim()) {
                where.cnpj = { [Op.iLike]: `%${filtros.cnpj}` }
            }

            const consulta = await Empresa.findAndCountAll({
                where,
                order: [['id']],
                limit,
                offset
            })

            return {
                totalItens: consulta.count,
                páginaAtual: page,
                totalPágina: Math.ceil(consulta.count / limit),
                data: consulta.rows
            }
        } catch (error) {
            throw error
        }
    }
    async atualizarEmpresa(id, dadosAtualizados) {
        try {
            const atualizar = await Empresa.update(dadosAtualizados, {
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw error
        }
    }
    async deletarEmpresa(id) {
        try {
            const deletar = await Empresa.destroy({
                where: {
                    id: id
                }
            })

            return "Deletado com Sucesso"
        } catch (error) {
            throw error
        }
    }
}

export default new EmpresaService();