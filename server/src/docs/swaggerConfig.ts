import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { UserResponse } from './schemas/userResponse.schema';
import { CreateUserRequest } from './schemas/createUserRequest.schema';
import { UpdateUserRequest } from './schemas/updateUserRequest.schema';
import { ErrorResponse} from './schemas/errorResponse.schema';

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
