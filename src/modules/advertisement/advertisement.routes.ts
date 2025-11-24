import {Router, Request, Response} from 'express';
import { createAdvertisement, getAdvertisementById, updateAdvertisement, getAdvertisementGridFilter, getAdvertisementsPage, uploadAdvertisementsImage, deleteAdvertisementsImage, getUserAdvertisements, getAdvertisementsByIds, deleteAdvertisement, getStats} from './advertisement.controller';
import authMiddleware from '../../middlewares/authMiddleware';
import {upload} from  '../../config/multerConfig'

const router = Router();

/**
 * @openapi
 * /advertisements:
 *   post:
 *     summary: Cria um novo anúncio
 *     tags:
 *       - Anúncios
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAdvertisementRequest'
 *     responses:
 *       201:
 *         description: Anúncio criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdvertisementResponse'
 */
router.post('/', authMiddleware,  async (req: Request, res: Response) => {
    await createAdvertisement(req, res);
})



/**
 * @openapi
 * /advertisements/grid:
 *   get:
 *     summary: Retorna agrupamento de anúncios por grid geográfico
 *     tags:
 *       - Anúncios
 *     parameters:
 *       - in: query
 *         name: resolution
 *         schema:
 *           type: integer
 *       - in: query
 *         name: minLatitude
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxLatitude
 *         schema:
 *           type: number
 *       - in: query
 *         name: minLongitude
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxLongitude
 *         schema:
 *           type: number
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *       - in: query
 *         name: priceMax
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Subgrids com anúncios
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/GridResponse'
 * 
 *       401:
 *         description: Não autorizado - token inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Sem permissão para acessar esse recurso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Anúncio não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/grid', authMiddleware,  async (req: Request, res: Response) => {
    await getAdvertisementGridFilter(req, res);
})

/**
 * @openapi
 * /advertisements/page:
 *   get:
 *     summary: Lista anúncios com paginação
 *     tags:
 *       - Anúncios
 *     parameters:
 *       - in: query
 *         name: userLongitude
 *         schema:
 *           type: integer
 *       - in: query
 *         name: userLatitude
 *         schema:
 *           type: integer
 *       - in: query
 *         name: distanceMax
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: orderDirection
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *       - in: query
 *         name: orderField
 *         schema:
 *           type: string
 *           enum: [created_at, price, distance]
 *       - in: query
 *         name: priceMax
 *         schema:
 *           type: integer
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *       - in: query
 *         name: text
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista paginada de anúncios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedAdvertisementResponse'
 * 
 *       400:
 *          description: Token mal formatado ou não fornecido ou Erro de validação dos dados
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Não autorizado - token inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Sem permissão para acessar esse recurso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Anúncio não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', authMiddleware,  async (req: Request, res: Response) => {
    await getAdvertisementsPage(req, res);
})

/**
 * @openapi
 * /advertisements/stats:
 *   get:
 *     summary: Retorna estatísticas dos anúncios
 *     tags:
 *       - Anúncios
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: number
 *           format: float
 *         description: Latitude do usuário (-90 a 90)
 *       - in: query
 *         name: lng
 *         required: true
 *         schema:
 *           type: number
 *           format: float
 *         description: Longitude do usuário (-180 a 180)
 *     responses:
 *       200:
 *         description: Estatísticas retornadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StatsResponse'
 *       400:
 *         description: Token mal formatado ou não fornecido ou Erro de validação dos dados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/stats', authMiddleware,  async (req: Request, res: Response) => {
    await getStats(req, res);
})

/**
 * @openapi
 * /advertisements/{id}:
 *   get:
 *     summary: Retorna os detalhes de um anúncio
 *     tags:
 *       - Anúncios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Anúncio encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdvertisementResponse'
 *       400:
 *          description: Token mal formatado ou não fornecido ou Erro de validação dos dados
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Anúncio não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', authMiddleware,  async (req: Request, res: Response) => {
    await getAdvertisementById(req, res);
})

/**
 * @openapi
 * /advertisements/{id}:
 *   put:
 *     summary: Atualiza um anúncio existente
 *     tags:
 *       - Anúncios
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAdvertisementRequest'
 *     responses:
 *       200:
 *         description: Anúncio atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdvertisementResponse'
 *       400:
 *          description: Token mal formatado ou não fornecido ou Erro de validação dos dados
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Não autorizado - token inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Sem permissão para acessar esse recurso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Anúncio não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', authMiddleware,  async (req: Request, res: Response) => {
    await updateAdvertisement(req, res);
})


/**
 * @openapi
 * /advertisements/user/{userId}:
 *   get:
 *     summary: Lista anúncios de um usuário com paginação
 *     tags:
 *       - Anúncios
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: orderDirection
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *       - in: query
 *         name: priceMax
 *         schema:
 *           type: integer
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista paginada de anúncios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedAdvertisementResponse'
 * 
 *       400:
 *          description: Token mal formatado ou não fornecido ou Erro de validação dos dados
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Não autorizado - token inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Sem permissão para acessar esse recurso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Anúncio não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/user/:userId', authMiddleware,  async (req: Request, res: Response) => {
    await getUserAdvertisements(req, res);
})

/**
 * @openapi
 * /advertisements/batch:
 *   post:
 *     summary: Lista de anúncios com base em uma lista de IDs fornecidos.
 *     tags:
 *       - Anúncios
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *       - in: query
 *         name: priceMax
 *         schema:
 *           type: integer
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdvertisementsBatchRequest'
 *     responses:
 *       200:
 *         description: Lista paginada de anúncios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedAdvertisementResponse'
 *       400:
 *         description: Token mal formatado ou não fornecido ou Erro de validação dos dados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Não autorizado - token inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Sem permissão para acessar esse recurso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Anúncio não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/batch', authMiddleware,  async (req: Request, res: Response) => {
    await getAdvertisementsByIds(req, res);
})

/**
 * @openapi
 * /advertisement/{id}/images:
 *   post:
 *     summary: Faz upload de imagens para um anúncio
 *     tags:
 *       - Anúncios
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Imagens enviadas com sucesso
 *       400:
 *          description: Token mal formatado ou não fornecido ou Erro de validação dos dados
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Não autorizado - token inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Sem permissão para acessar esse recurso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/:id/images',upload.array('images',5), authMiddleware,  async (req: Request, res: Response) => {
    await uploadAdvertisementsImage(req, res);
})

/**
 * @openapi
 * /advertisement/images/{id}:
 *   delete:
 *     summary: Remove uma imagem de anúncio
 *     tags:
 *       - Anúncios
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Imagem removida com sucesso
 * 
 *       400:
 *          description: Token mal formatado ou não fornecido ou Erro de validação dos dados
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Não autorizado - token inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Sem permissão para acessar esse recurso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/images/:id', authMiddleware,  async (req: Request, res: Response) => {
    await deleteAdvertisementsImage(req, res);
})



/**
 * @openapi
 * /advertisements/{id}:
 *   delete:
 *     summary: Remove um anúncio pelo ID
 *     tags:
 *       - Anúncios
 *     responses:
 *       204:
 *         description: Anúncio removido com sucesso (sem corpo de resposta)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedAdvertisementResponse'
 * 
 *       400:
 *          description: Token mal formatado ou não fornecido ou Erro de validação dos dados
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Não autorizado - token inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Sem permissão para acessar esse recurso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Anúncio não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', authMiddleware,  async (req: Request, res: Response) => {
    await deleteAdvertisement(req, res);
})



export default router; 