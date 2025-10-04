import {Router, Request, Response} from 'express';
import { createUser, deleteUser, getUserById, updateUser, uploadUserImage, deleteUserImage} from './user.controller';
import authMiddleware from '../../middlewares/authMiddleware';
import {upload} from  '../../config/multerConfig'


const router = Router();

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Cria um usuário
 *     tags:
 *       - Usuários
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *     responses:
 *       200:
 *         description: Retorna o usuário criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 */

router.post('/', async (req: Request, res: Response) => {
    await createUser(req, res);
});

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Retorna um usuário dado um ID
 *     tags:
 *       - Usuários
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Retorna um usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Token mal formatado ou não fornecido
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
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', authMiddleware,async (req: Request, res: Response) => {
    await getUserById(req, res);
});

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário pelo ID
 *     tags:
 *       - Usuários
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
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
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.put('/:id',authMiddleware, async (req: Request, res: Response) => {
    await updateUser(req, res);
} )

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Remove um usuário pelo ID
 *     tags:
 *       - Usuários
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário a ser removido
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Usuário removido com sucesso (sem corpo de resposta)
 *       400:
 *         description: ID inválido ou ausente
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
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id',authMiddleware, async (req: Request, res: Response) => {
    await deleteUser(req, res);
})

/**
 * @openapi
 * /users/{id}/images:
 *   post:
 *     summary: Faz upload de imagem de perfil de usuário
 *     tags:
 *       - Usuários
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
 *         description: Imagem enviada com sucesso
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
router.post('/:id/images',upload.single('image'), authMiddleware,  async (req: Request, res: Response) => {
    await uploadUserImage(req, res);
})

/**
 * @openapi
 * /users/{id}/images:
 *   delete:
 *     summary: Remove imagem de perfil do usuário
 *     tags:
 *       - Usuários
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
router.delete('/:id/images', authMiddleware,  async (req: Request, res: Response) => {
    await deleteUserImage(req, res);
})

export default router; 