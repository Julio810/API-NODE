import ProdutoService from "../service/produtoService.js";

class ProdutoController {
    static async cadastrarProduto(req, res) {
        try {
            const cadastro = req.body

            const resultado = await ProdutoService.cadastrarProduto(cadastro)

            res.status(201).json(resultado)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    static async consultarProdutos(req, res) {
        try {
            const { nome, fabricacao, serial, descricao, page = 1, limit = 10 } = req.query

            const filtros = { nome, fabricacao, serial, descricao }

            const resultado = await ProdutoService.consultarProdutos(
                filtros,
                Number(page),
                Number(limit)
            )

            res.status(200).json(resultado)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    static async atualizarProduto(req, res) {
        try {
            const { id } = req.params
            const atualizar = req.body

            const resultado = await ProdutoService.atualizarProdutos(id, atualizar)

            res.status(200).json(resultado)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    static async deletarProduto(req, res) {
        try {
            const { id } = req.params

            const resultado = await ProdutoService.deletarProdutos(id)

            res.status(200).json(resultado)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

export default ProdutoController;