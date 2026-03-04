import PrateleiraService from "../service/prateleiraService.js";

class PrateleiraController {
    static async inserirProdutos(req, res) {
        try {
            const inserir = req.body

            const resultado = await PrateleiraService.inserirProdutos(inserir)

            res.status(201).json(resultado)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    static async buscarProdutos(req, res) {
        try {
            const { page = 1, limit = 10, marca, produtoId } = req.query

            const filtros = { marca, produtoId }

            const resultado = await PrateleiraService.buscarProdutos(
                filtros,
                Number(page),
                Number(limit)
            )

            res.status(200).json(resultado)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    static async atualizarPrateleira(req, res) {
        try {
            const { id } = req.params
            const atualizar = req.body

            const resultado = await PrateleiraService.atualizarPrateleira(id, atualizar)

            res.status(200).json(resultado)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    static async deletarPrateleira(req, res) {
        try {
            const deletar = req.params.id

            const atualizar = await PrateleiraService.deletarPrateleira(deletar)

            res.status(200).json(atualizar)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

export default PrateleiraController;