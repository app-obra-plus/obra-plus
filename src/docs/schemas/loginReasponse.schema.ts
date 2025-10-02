export const LoginResponse = {
  type: 'object',
  properties: {
    token: {
      type: 'string',
      description: 'JWT de autenticação',
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    },
    user: {
      $ref: '#/components/schemas/UserResponse'
    }
  },
  required: ['token', 'user']
};