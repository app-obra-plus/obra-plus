import {Router, Request, Response} from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { createAddress, deleteAddress, getAddress, getAllAddress, updateAddress} from './address.controller';

const router = Router();

/**
 * @openapi
 * /addresses:
 *   post:
 *     summary: Cria um novo endereço para o usuário autenticado
 *     tags:
 *       - Endereços
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAddressRequest'
 *     responses:
 *       201:
 *         description: Endereço criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddressResponse'
 *       400:
 *         description: Requisição inválida (dados ausentes ou inválidos)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Não autorizado (token inválido ou ausente)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/',authMiddleware,async (req: Request, res: Response) => {
    await createAddress(req, res);
});

/**
 * @openapi
 * /addresses/{addressId}:
 *   get:
 *     summary: Retorna um endereço específico
 *     tags:
 *       - Endereços
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do endereço a ser recuperado
 *     responses:
 *       200:
 *         description: Endereço encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddressResponse'
 *       404:
 *         description: Endereço não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.get('/:addressId',authMiddleware,async (req: Request, res: Response) => {
    await getAddress(req, res);
});

/**
 * @openapi
 * /addresses/user/{userId}:
 *   get:
 *     summary: Lista todos os endereços de um usuário
 *     tags:
 *       - Endereços
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de endereços retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AddressResponse'
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.get('/user/:userId',authMiddleware,async (req: Request, res: Response) => {
    await getAllAddress(req, res);
});

/**
 * @openapi
 * /addresses/{addressId}:
 *   put:
 *     summary: Atualiza um endereço existente
 *     tags:
 *       - Endereços
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do endereço a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAddressRequest'
 *     responses:
 *       200:
 *         description: Endereço atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddressResponse'
 *       404:
 *         description: Endereço não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.put('/:addressId',authMiddleware,async (req: Request, res: Response) => {
    await updateAddress(req, res);
});

/**
 * @openapi
 * /addresses/{addressId}:
 *   delete:
 *     summary: Remove um endereço
 *     tags:
 *       - Endereços
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do endereço a ser excluído
 *     responses:
 *       204:
 *         description: Endereço removido com sucesso (sem conteúdo)
 *       404:
 *         description: Endereço não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:addressId', authMiddleware, async (req: Request, res: Response) => {
  await deleteAddress(req, res);
});

export default router; 