import CarroService from "../service/carroService.js"

class CarroController {
    static async cadastrarCarro(req, res) {
        try {
            const cadastro = req.body

            const resultado = await CarroService.cadastrarCarro(cadastro)

            res.status(201).json(resultado)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    static async buscarCarros(req, res) {
        try {
            const { page = 1, limit = 10, chassi, modelo } = req.query

            const filtros = { chassi, modelo }

            const resultado = await CarroService.buscarCarros(
                filtros,
                page,
                limit
            )

            res.status(200).json(resultado)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    static async atualizarCarros(req, res) {
        try {
            const atualizar = req.body

            const resultado = await CarroService.atualizarCarros(atualizar)

            res.status(200).json(resultado)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    static async deletarCarros(req, res) {
        try {
            const { id } = req.params

            const resultado = await CarroService.deletarCarros(id)

            res.status(200).json(resultado)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

export default CarroController;