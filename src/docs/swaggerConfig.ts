import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { UserResponse } from './schemas/userResponse.schema';
import { CreateUserRequest } from './schemas/createUserRequest.schema';
import { UpdateUserRequest } from './schemas/updateUserRequest.schema';
import { CreateAddressRequest } from './schemas/createAddressRequest.schema';
import { ErrorResponse} from './schemas/errorResponse.schema';
import { AddressResponse } from './schemas/addressResponse.schema';
import { UpdateAddressRequest } from './schemas/updatedAddress.schema';
import { LoginResponse } from './schemas/loginReasponse.schema';
import { CreateAdvertisementRequest } from './schemas/createAdvertisementRequest.schema';
import { AdvertisementResponse } from './schemas/advertisementResponse.schema';
import { ImageResponse } from './schemas/imageResponse.schema';
import { UpdateAdvertisementRequest } from './schemas/updateAdvertisementRequest.schema';
import { PaginationMeta } from './schemas/PaginationMeta.schema';
import { PaginatedAdvertisementResponse } from './schemas/paginatedAdvertisementResponse.schema';
import { SubGridResponse, GridResponse } from './schemas/subGridResponse.schema';
import { AdvertisementsBatchRequest } from './schemas/advertisementsBatchRequest.schema';
import { CreateChatRequest } from './schemas/createChat.schema';
import { ChatResponse } from './schemas/chatResponse.schema';
import { ChatSummary,PaginatedChatSummary } from './schemas/chatSummary.schema';
import { CreateMessageSchema, Message, Messages, PaginatedMessage } from './schemas/message.schema';
import { StatsResponse } from './schemas/statsResponse.schema';

// Documentação disponível em http://localhost:3000/api-docs
const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    components:{
        securitySchemes: {
          bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
          }
        },
       schemas: {
        UserResponse,
        CreateUserRequest,
        UpdateUserRequest,
        ErrorResponse,
        CreateAddressRequest,
        AddressResponse,
        UpdateAddressRequest,
        LoginResponse,
        CreateAdvertisementRequest,
        AdvertisementResponse,
        ImageResponse,
        UpdateAdvertisementRequest,
        PaginationMeta,
        PaginatedAdvertisementResponse,
        SubGridResponse,
        GridResponse,
        AdvertisementsBatchRequest,
        CreateChatRequest,
        ChatResponse,
        ChatSummary,
        PaginatedChatSummary,
        Messages,
        PaginatedMessage,
        Message,
        CreateMessageSchema,
        StatsResponse 


      }
    },
    info: {
      title: 'Obra+ API',
      version: '1.0.0',
      description: 'Obra+ é uma plataforma que conecta pessoas interessadas em doar ou adquirir materiais de construção de forma sustentável e acessível. Através da aplicação, usuários podem criar contas, anunciar itens para doação ou venda, buscar produtos com filtros avançados, visualizar anúncios no mapa, interagir por mensagens e gerenciar seus próprios anúncios e endereços.Esta API fornece os recursos necessários para autenticação, gerenciamento de usuários, anúncios, mensagens em tempo real, e visualização de produtos com base na geolocalização. A aplicação busca promover o reaproveitamento de materiais, reduzir desperdícios e incentivar a economia circular no setor da construção civil.',
    },
    security: [ { bearerAuth: [] } ],
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['src/modules/**/*.routes.ts'], 
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
