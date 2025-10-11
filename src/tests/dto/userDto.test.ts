import { CreateUserSchema } from '../../modules/users/dto/CreateUserDto';
import { UpdateUserSchema } from '../../modules/users/dto/UpdateUserDto';

describe('CreateUserSchema', () => {
  const validUser = {
    email: 'joao@example.com',
    password: 'senha123',
    first_name: 'João',
    last_name: 'Silva',
    phone_number: '11987654321',
  };

  describe('Validações de Sucesso', () => {
    it('deve aceitar usuário válido completo', () => {
      const result = CreateUserSchema.safeParse(validUser);
      expect(result.success).toBe(true);
    });

    it('deve aceitar usuário com profile_picture opcional', () => {
      const userWithPicture = {
        ...validUser,
        profile_picture: 'https://example.com/avatar.png',
      };
      const result = CreateUserSchema.safeParse(userWithPicture);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.profile_picture).toBe('https://example.com/avatar.png');
      }
    });

    it('deve aceitar usuário sem profile_picture', () => {
      const result = CreateUserSchema.safeParse(validUser);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.profile_picture).toBeUndefined();
      }
    });

    it('deve aceitar primeiro nome com 2 caracteres (mínimo)', () => {
      const user = {
        ...validUser,
        first_name: 'Jo',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(true);
    });

    it('deve aceitar sobrenome com 2 caracteres (mínimo)', () => {
      const user = {
        ...validUser,
        last_name: 'Li',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(true);
    });

    it('deve aceitar senha com 6 caracteres (mínimo)', () => {
      const user = {
        ...validUser,
        password: '123456',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(true);
    });

    it('deve aceitar diferentes DDDs válidos', () => {
      const ddds = ['11', '21', '31', '41', '51', '61', '71', '81', '91'];
      ddds.forEach((ddd) => {
        const user = {
          ...validUser,
          phone_number: `${ddd}987654321`,
        };
        const result = CreateUserSchema.safeParse(user);
        expect(result.success).toBe(true);
      });
    });

    it('deve aceitar nomes com acentos', () => {
      const user = {
        ...validUser,
        first_name: 'José',
        last_name: 'Müller',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(true);
    });

    it('deve aceitar nomes compostos', () => {
      const user = {
        ...validUser,
        first_name: 'Maria Clara',
        last_name: 'Santos Silva',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(true);
    });

    it('deve fazer trim em campos de texto', () => {
      const user = {
        ...validUser,
        first_name: '  João  ',
        last_name: '  Silva  ',
        password: '  senha123  ',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.first_name).toBe('João');
        expect(result.data.last_name).toBe('Silva');
        expect(result.data.password).toBe('senha123');
      }
    });
  });

  describe('Validações de email', () => {
    it('deve rejeitar email inválido (sem @)', () => {
      const user = {
        ...validUser,
        email: 'emailinvalido.com',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('E-mail inválido');
      }
    });

    it('deve rejeitar email inválido (sem domínio)', () => {
      const user = {
        ...validUser,
        email: 'email@',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar email vazio', () => {
      const user = {
        ...validUser,
        email: '',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(false);
    });

    it('deve aceitar emails válidos variados', () => {
      const validEmails = [
        'user@example.com',
        'user.name@example.com',
        'user+tag@example.co.uk',
        'user123@test-domain.com',
        'a@b.co',
      ];
      validEmails.forEach((email) => {
        const user = { ...validUser, email };
        const result = CreateUserSchema.safeParse(user);
        expect(result.success).toBe(true);
      });
    });

    it('deve rejeitar quando email está ausente', () => {
      const { email, ...user } = validUser;
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(false);
    });
  });

  describe('Validações de password', () => {
    it('deve rejeitar senha muito curta (menos de 6 caracteres)', () => {
      const user = {
        ...validUser,
        password: '12345',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Senha muito curta');
      }
    });

    it('deve rejeitar senha vazia', () => {
      const user = {
        ...validUser,
        password: '',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(false);
    });

    it('deve aceitar senhas longas', () => {
      const user = {
        ...validUser,
        password: 'senhamuito123longacomcaracteresespeciaisetudo!@#$%',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(true);
    });

    it('deve aceitar senha com caracteres especiais', () => {
      const user = {
        ...validUser,
        password: 'Senh@123!',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(true);
    });

    it('deve rejeitar quando password está ausente', () => {
      const { password, ...user } = validUser;
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(false);
    });
  });

  describe('Validações de first_name', () => {
    it('deve rejeitar primeiro nome muito curto (menos de 2 caracteres)', () => {
      const user = {
        ...validUser,
        first_name: 'J',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Nome muito curto');
      }
    });

    it('deve rejeitar primeiro nome vazio', () => {
      const user = {
        ...validUser,
        first_name: '',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar primeiro nome apenas com espaços', () => {
      const user = {
        ...validUser,
        first_name: '   ',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar quando first_name está ausente', () => {
      const { first_name, ...user } = validUser;
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(false);
    });

    it('deve aceitar nomes longos', () => {
      const user = {
        ...validUser,
        first_name: 'João Pedro Ricardo da Silva',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(true);
    });
  });

  describe('Validações de last_name', () => {
    it('deve rejeitar sobrenome muito curto (menos de 2 caracteres)', () => {
      const user = {
        ...validUser,
        last_name: 'S',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Sobrenome muito curto');
      }
    });

    it('deve rejeitar sobrenome vazio', () => {
      const user = {
        ...validUser,
        last_name: '',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar sobrenome apenas com espaços', () => {
      const user = {
        ...validUser,
        last_name: '   ',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar quando last_name está ausente', () => {
      const { last_name, ...user } = validUser;
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(false);
    });

    it('deve aceitar sobrenomes longos e compostos', () => {
      const user = {
        ...validUser,
        last_name: 'Santos Silva Oliveira Junior',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(true);
    });
  });

  describe('Validações de phone_number', () => {
    it('deve rejeitar número sem DDD (menos de 11 dígitos)', () => {
      const user = {
        ...validUser,
        phone_number: '987654321',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar número com menos de 11 dígitos', () => {
      const user = {
        ...validUser,
        phone_number: '1198765432',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('11 dígitos');
      }
    });

    it('deve rejeitar número com mais de 11 dígitos', () => {
      const user = {
        ...validUser,
        phone_number: '119876543210',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar número que não começa com 9 após o DDD', () => {
      const user = {
        ...validUser,
        phone_number: '11887654321',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('DDD seguido de 9');
      }
    });

    it('deve rejeitar número com letras', () => {
      const user = {
        ...validUser,
        phone_number: '1198765432a',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar número vazio', () => {
      const user = {
        ...validUser,
        phone_number: '',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar quando phone_number está ausente', () => {
      const { phone_number, ...user } = validUser;
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(false);
    });

    it('deve aceitar números válidos de diferentes regiões', () => {
      const validNumbers = [
        '11987654321',
        '21987654321',
        '31987654321',
        '85987654321',
        '61987654321',
      ];
      validNumbers.forEach((phone_number) => {
        const user = { ...validUser, phone_number };
        const result = CreateUserSchema.safeParse(user);
        expect(result.success).toBe(true);
      });
    });
  });

  describe('Validações de profile_picture', () => {
    it('deve rejeitar URL inválida', () => {
      const user = {
        ...validUser,
        profile_picture: 'não-é-uma-url',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar URL sem protocolo', () => {
      const user = {
        ...validUser,
        profile_picture: 'example.com/avatar.png',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(false);
    });

    it('deve aceitar URLs HTTP', () => {
      const user = {
        ...validUser,
        profile_picture: 'http://example.com/avatar.png',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(true);
    });

    it('deve aceitar URLs HTTPS', () => {
      const user = {
        ...validUser,
        profile_picture: 'https://cdn.example.com/users/avatar.jpg',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(true);
    });

    it('deve aceitar profile_picture como undefined (campo opcional)', () => {
      const user = { ...validUser };
      delete (user as any).profile_picture;
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(true);
    });
  });

  describe('Validações Múltiplas', () => {
    it('deve rejeitar quando múltiplos campos são inválidos', () => {
      const user = {
        email: 'invalido',
        password: '123',
        first_name: 'J',
        last_name: 'S',
        phone_number: '123',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThanOrEqual(4);
      }
    });

    it('deve rejeitar quando todos os campos estão ausentes', () => {
      const user = {};
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBe(5);
      }
    });

    it('deve aceitar usuário completo com profile_picture', () => {
      const user = {
        email: 'joao@example.com',
        password: 'senha@123',
        first_name: 'João Pedro',
        last_name: 'Santos Silva',
        phone_number: '11987654321',
        profile_picture: 'https://cdn.example.com/avatar.png',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(true);
    });
  });

  describe('Casos de Uso Reais', () => {
    it('deve aceitar usuário típico brasileiro', () => {
      const user = {
        email: 'maria.silva@gmail.com',
        password: 'MinhaSenha@2025',
        first_name: 'Maria',
        last_name: 'Silva',
        phone_number: '11987654321',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(true);
    });

    it('deve aceitar nome com acentuação brasileira', () => {
      const user = {
        email: 'jose@example.com',
        password: 'senha123',
        first_name: 'José',
        last_name: 'São Paulo',
        phone_number: '21987654321',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(true);
    });

    it('deve aceitar sobrenome composto', () => {
      const user = {
        email: 'pedro@example.com',
        password: 'senha123',
        first_name: 'Pedro',
        last_name: 'Alves de Souza',
        phone_number: '31987654321',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(true);
    });

    it('deve aceitar usuário com imagem de perfil do Vercel Blob', () => {
      const user = {
        email: 'usuario@example.com',
        password: 'senha123',
        first_name: 'Usuário',
        last_name: 'Teste',
        phone_number: '11987654321',
        profile_picture: 'https://xyz.public.blob.vercel-storage.com/profile/user123-abc.png',
      };
      const result = CreateUserSchema.safeParse(user);
      expect(result.success).toBe(true);
    });
  });
});

describe('UpdateUserSchema', () => {
  const validUpdate = {
    first_name: 'João Atualizado',
    last_name: 'Silva Atualizado',
    phone_number: '11988888888',
  };

  describe('Validações de Sucesso', () => {
    it('deve aceitar atualização completa', () => {
      const result = UpdateUserSchema.safeParse(validUpdate);
      expect(result.success).toBe(true);
    });

    it('deve aceitar atualização apenas de first_name', () => {
      const update = {
        first_name: 'Novo Nome',
      };
      const result = UpdateUserSchema.safeParse(update);
      expect(result.success).toBe(true);
    });

    it('deve aceitar atualização apenas de last_name', () => {
      const update = {
        last_name: 'Novo Sobrenome',
      };
      const result = UpdateUserSchema.safeParse(update);
      expect(result.success).toBe(true);
    });

    it('deve aceitar atualização apenas de phone_number', () => {
      const update = {
        phone_number: '11999999999',
      };
      const result = UpdateUserSchema.safeParse(update);
      expect(result.success).toBe(true);
    });

    it('deve aceitar atualização apenas de profile_picture', () => {
      const update = {
        profile_picture: 'https://example.com/new-avatar.png',
      };
      const result = UpdateUserSchema.safeParse(update);
      expect(result.success).toBe(true);
    });

    it('deve aceitar objeto vazio (atualização parcial)', () => {
      const update = {};
      const result = UpdateUserSchema.safeParse(update);
      expect(result.success).toBe(true);
    });

    it('deve aceitar profile_picture como string vazia', () => {
      const update = {
        profile_picture: '',
      };
      const result = UpdateUserSchema.safeParse(update);
      expect(result.success).toBe(true);
    });

    it('deve aceitar atualização de múltiplos campos', () => {
      const update = {
        first_name: 'João',
        last_name: 'Silva',
      };
      const result = UpdateUserSchema.safeParse(update);
      expect(result.success).toBe(true);
    });
  });

  describe('Validações de Erro', () => {
    it('deve rejeitar first_name muito curto', () => {
      const update = {
        first_name: 'J',
      };
      const result = UpdateUserSchema.safeParse(update);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Nome muito curto');
      }
    });

    it('deve rejeitar last_name muito curto', () => {
      const update = {
        last_name: 'S',
      };
      const result = UpdateUserSchema.safeParse(update);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Sobrenome muito curto');
      }
    });

    it('deve rejeitar phone_number muito curto', () => {
      const update = {
        phone_number: '1198765',
      };
      const result = UpdateUserSchema.safeParse(update);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Número inválido');
      }
    });

    it('deve rejeitar profile_picture com URL inválida', () => {
      const update = {
        profile_picture: 'não-é-url',
      };
      const result = UpdateUserSchema.safeParse(update);
      expect(result.success).toBe(false);
    });
  });

  describe('Diferenças com CreateSchema', () => {
    it('não deve exigir campos obrigatórios', () => {
      const update = {};
      const result = UpdateUserSchema.safeParse(update);
      expect(result.success).toBe(true);
    });

    it('não permite atualização de email', () => {
      const update = {
        email: 'novo@email.com',
      };
      const result = UpdateUserSchema.safeParse(update);
      expect(result.success).toBe(true);
      if (result.success) {
        expect((result.data as any).email).toBeUndefined();
      }
    });

    it('não permite atualização de password', () => {
      const update = {
        password: 'novasenha123',
      };
      const result = UpdateUserSchema.safeParse(update);
      expect(result.success).toBe(true);
      if (result.success) {
        expect((result.data as any).password).toBeUndefined();
      }
    });

    it('phone_number tem validação mais flexível (min 11)', () => {
      const update = {
        phone_number: '11987654321',
      };
      const result = UpdateUserSchema.safeParse(update);
      expect(result.success).toBe(true);
    });
  });

  describe('Casos de Uso Reais de Update', () => {
    it('deve aceitar atualização de nome completo', () => {
      const update = {
        first_name: 'João Pedro',
        last_name: 'Santos Silva',
      };
      const result = UpdateUserSchema.safeParse(update);
      expect(result.success).toBe(true);
    });

    it('deve aceitar troca de número de telefone', () => {
      const update = {
        phone_number: '21987654321',
      };
      const result = UpdateUserSchema.safeParse(update);
      expect(result.success).toBe(true);
    });

    it('deve aceitar remoção de foto de perfil (string vazia)', () => {
      const update = {
        profile_picture: '',
      };
      const result = UpdateUserSchema.safeParse(update);
      expect(result.success).toBe(true);
    });

    it('deve aceitar atualização de foto de perfil', () => {
      const update = {
        profile_picture: 'https://blob.vercel-storage.com/user/new-avatar.png',
      };
      const result = UpdateUserSchema.safeParse(update);
      expect(result.success).toBe(true);
    });

    it('deve aceitar correção de nome', () => {
      const update = {
        first_name: 'João (Corrigido)',
      };
      const result = UpdateUserSchema.safeParse(update);
      expect(result.success).toBe(true);
    });
  });
});

