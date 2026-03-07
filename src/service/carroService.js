import { Op } from "sequelize"
import Carro from "../models/Carro.js"

class CarroService {
    async cadastrarCarro(dadosVeiculo) {
        try {
            // 1. LIMPEZA E FORMATAÇÃO 🧹
            // Filtramos quem tem os campos obrigatórios e formatamos os dados
            const cadastrarVeiculos = dadosVeiculo
                .filter(v => v.chassi && v.placa)
                .map(v => ({
                    ...v,
                    chassi: v.chassi.toUpperCase(),
                    placa: Number(v.placa)
                }));

            // 2. VALIDAÇÃO INTERNA (DUPLICADOS NA LISTA ENVIADA)
            const listaChassis = cadastrarVeiculos.map(v => v.chassi);
            const listaPlacas = cadastrarVeiculos.map(v => v.placa);

            const chassisUnicos = new Set(listaChassis);
            const placasUnicas = new Set(listaPlacas);

            if (chassisUnicos.size !== listaChassis.length || placasUnicas.size !== listaPlacas.length) {
                throw new Error("A lista enviada contém chassis ou placas repetidos entre si.");
            }

            // 3. VALIDAÇÃO NO BANCO DE DADOS (DUPLICADOS NO SISTEMA)
            const dados = await Carro.findAll({
                where: {
                    [Op.or]: [
                        { chassi: { [Op.in]: listaChassis } },
                        { placa: { [Op.in]: listaPlacas } }
                    ]
                },
                attributes: ['chassi', 'placa']
            });

            if (dados.length > 0) {
                const chassisJaUsados = dados
                    .map(e => e.chassi)
                    .filter(c => listaChassis.includes(c));

                const placasJaUsadas = dados
                    .map(e => e.placa)
                    .filter(p => listaPlacas.includes(p));

                let mensagem = 'Cadastro interrompido: ';
                if (chassisJaUsados.length > 0) mensagem += `Chassis já existentes: ${chassisJaUsados.join(', ')}. `;
                if (placasJaUsadas.length > 0) mensagem += `Placas já existentes: ${placasJaUsadas.join(', ')}.`;

                throw new Error(mensagem);
            }

            // 4. CADASTRO FINAL 
            const cadastros = await Carro.bulkCreate(cadastrarVeiculos);
            return cadastros;

        } catch (error) {
            throw error;
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