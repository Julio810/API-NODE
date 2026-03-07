import MotocicletasService from "../service/motocicletasService.js"

class MotocicletasController {
    static async cadastrarMotocicleta(req, res) {
        try {
            const cadastro = req.body

            const resultado = await MotocicletasService.cadastrarMotocicleta(cadastro)

            res.status(201).json(resultado)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    static async buscarMotocicletas(req, res) {
        try {
            const { page = 1, limit = 10, marca, modelo, cor } = req.params

            const filtros = { marca, modelo, cor }

            const resultado = await MotocicletasService.buscarMotocicletas(
                filtros,
                page,
                limit
            )

            res.status(200).json(resultado)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    static async atualizarMotocicleta(req, res) {
        try {
            const { id } = req.params
            const atualizar = req.body

            const resultado = await MotocicletasService.atualizarMotocicleta(id, atualizar)

            res.status(200).json(resultado)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    static async deletarMotocicleta(req, res) {
        try {
            const { id } = req.params

            const resultado = await MotocicletasService.deletarMotocicleta(id)

            res.status(200).json(resultado)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

export default MotocicletasController;