# ASE Automações 🚪

Site institucional do **Portão Inteligente ASE** — projeto de automação residencial com Arduino e IoT, focado em acessibilidade, segurança e eficiência.

---

## 📁 Estrutura de Arquivos

```
ASE-automacoes/
│
├── index.html               ← Página inicial (Segurança e Inovação para o Lar)
├── produto.html              ← Detalhes do Portão Inteligente ASE
├── tecnologia.html           ← Automação residencial, IoT, Arduino e simulação
├── seguranca-dados.html      ← Riscos de acesso residencial e como o produto ajuda
├── sobre-nos.html            ← Missão, visão e valores da ASE Automações
├── contato.html               ← Formulário e canais de contato
│
├── style.css                  ← Estilos principais do site
├── product-page.css           ← Reservado para estilos específicos da página de produto
├── script.js                  ← Interatividade (scroll suave, navbar, animações, form)
│
├── logo-ase.png                ← Logo da marca
├── arduino-uno-placa.png       ← Imagem ilustrativa — Arduino Uno
├── iot-conceito.png            ← Imagem ilustrativa — conceito de IoT
├── automacao-residencial-diaadia.png ← Automação no dia a dia
├── portao-produto-detalhe.png  ← Detalhe do produto (portão)
├── seguranca-ilustracao.png    ← Ilustração de segurança
├── equipe-ase-automacoes.png   ← Foto/ilustração da equipe
├── tinkercad-simulacao.png     ← Simulação no Tinkercad
├── tinkercad-simulacao-detalhe.png ← Detalhe da simulação
├── Joystick.png / Joystick2.png ← Componente usado no projeto
```

---

## 🚀 Como rodar

Projeto 100% estático (HTML + CSS + JS), sem build nem backend.

Basta abrir `index.html` diretamente no navegador, ou servir a pasta com qualquer servidor estático:

```bash
npx serve .
# ou
python -m http.server 8000
```

---

## 🧭 Páginas do site

| Página | Conteúdo |
|---|---|
| `index.html` | Home — apresentação geral do Portão Inteligente ASE |
| `produto.html` | Funcionalidades, componentes e evolução do projeto |
| `tecnologia.html` | Automação residencial, IoT, Arduino e processo de simulação |
| `seguranca-dados.html` | Riscos de acesso residencial e como o produto aumenta a segurança |
| `sobre-nos.html` | Missão, visão e valores (Acessibilidade, Segurança, Eficiência) |
| `contato.html` | Formulário de contato e canais de atendimento |

---

## ⚙️ Funcionalidades (script.js)

| # | Módulo | O que faz |
|---|---|---|
| 1 | Smooth scrolling | Rolagem suave para links âncora (`#`), ignorando componentes Bootstrap |
| 2 | Navbar dinâmica | Muda de estilo ao ultrapassar o scroll de 50px |
| 3 | Animação ao rolar | Elementos animam ao entrar na tela via `IntersectionObserver` |
| 4 | Botão "voltar ao topo" | Aparece conforme o scroll da página |
| 5 | Validação do formulário | Validação básica do formulário de contato |

---

## 🔧 Dependências externas (CDN)

| Lib | Versão | Uso |
|---|---|---|
| Bootstrap | 5.3.3 | Grid, navbar e componentes |
| Font Awesome | 6.5.1 | Ícones |
| Google Fonts — Montserrat, Open Sans | — | Tipografia |

---

## 📌 Observações

- `product-page.css` está presente na estrutura, mas atualmente vazio — reservado para estilos específicos de `produto.html`.
- Não há backend: o formulário de contato realiza apenas validação client-side (não há envio configurado).
- Favicon ainda não definido (`<link rel="icon">` comentado no `<head>`).
