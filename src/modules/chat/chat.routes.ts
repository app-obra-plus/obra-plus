import {Router, Request, Response} from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { createChat, getChatById, sendMessage, getAllChatsByUser, getAllMessagesFromChatPage, getNewMessagesFromChat} from './chat.controller';


const router = Router();

/**
 * @openapi
 * /chats:
 *   post:
 *     summary: Cria um Chat
 *     tags:
 *       - Chats
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateChatRequest'
 *     responses:
 *       201:
 *         description: Retorna o chat criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatResponse'
 */
router.post('/',authMiddleware,async (req: Request, res: Response) => {
    await createChat(req, res);
});

/**
 * @openapi
 * /chats/my-chats:
 *   get:
 *     summary: Retorna a lista paginada de chats em que o usuário participa, ordenados pelo chat com a última mensagem mais recente
 *     tags:
 *       - Chats
 *     responses:
 *       200:
 *         description: Retorna a lista de chats paginada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedChatSummary'
 */
router.get('/my-chats',authMiddleware,async (req: Request, res: Response) => {
    await getAllChatsByUser(req, res);
});

/**
 * @openapi
 * /chats/{id}/messages:
 *   get:
 *     summary: Retorna a lista paginada de todas mensagens de um chat, ordenadas da mais recente para a mais antiga
 *     tags:
 *       - Chats
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do chat
 *     responses:
 *       200:
 *         description: Retorna a lista de mensagens paginada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedMessage'
 */
router.get('/:id/messages',authMiddleware,async (req: Request, res: Response) => {
    await getAllMessagesFromChatPage(req, res);
});

/**
 * @openapi
 * /chats/{id}/messages/news:
 *   get:
 *     summary: Retorna a lista paginada das últimas mensagens de um chat, ordenadas da mais recente para a mais antiga a partir da data/hora fornecida
 *     tags:
 *       - Chats
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do chat
 *       - in: query
 *         name: after
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Data/hora a partir da qual buscar mensagens
 *     responses:
 *       200:
 *         description: Retorna a lista de mensagens paginada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedMessage'
 */

router.get('/:id/messages/news',authMiddleware,async (req: Request, res: Response) => {
    await getNewMessagesFromChat(req, res);
});


/**
 * @openapi
 * /chats/{id}:
 *   get:
 *     summary: Retorna um chat dado o ID
 *     tags:
 *       - Chats
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do chat
 *     responses:
 *       200:
 *         description: Retorna um chat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatResponse'
 */
router.get('/:id',authMiddleware,async (req: Request, res: Response) => {
    await getChatById(req, res);
});

/**
 * @openapi
 * /chats/{id}/messages:
 *   post:
 *     summary: Envia uma mensagem
 *     tags:
 *       - Chats
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do chat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMessageSchema'
 *     responses:
 *       201:
 *         description: Retorna a mensagem criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
router.post('/:id/messages',authMiddleware,async (req: Request, res: Response) => {
    await sendMessage(req, res);
});


export default router; 