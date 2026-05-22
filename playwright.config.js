// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Define que seus testes de tela ficarão na pasta "tests" (na raiz do projeto)
  testDir: './tests',
  fullyParallel: true,
  
  // Se você rodar em ambiente local, ignora o erro do process.env
  forbidOnly: false,
  retries: 0,
  workers: undefined,
  
  reporter: 'html',
  
  use: {
    // 🎯 Define a URL padrão do seu Vite local (ajuste se a sua for diferente de 5173)
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },

  /* ⚙️ Configuração dos tamanhos de tela para testar seu layout */
  projects: [
    {
      name: 'desktop',
      use: { 
        ...devices['Desktop Chrome'], 
        viewport: { width: 1280, height: 720 } 
      },
    },
    {
      name: 'tablet',
      use: { 
        ...devices['iPad Mini'], 
        // 📟 Aqui a tela encolhe e sua sidebar deve ocupar 10% da largura
        viewport: { width: 768, height: 1024 } 
      },
    },
    {
      name: 'mobile',
      use: { 
        ...devices['iPhone 14'], 
        viewport: { width: 390, height: 844 } 
      },
    },
  ],
});
