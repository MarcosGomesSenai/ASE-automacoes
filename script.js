document.addEventListener('DOMContentLoaded', function() {

    // 1. SMOOTH SCROLLING PARA LINKS ÂNCORA
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Ignora links que são apenas '#' ou usados por componentes Bootstrap (ex: abas, carrossel)
            if (href === '#' || this.dataset.bsTarget || this.dataset.bsToggle) {
                return;
            }

            e.preventDefault();
            const targetId = href;
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar-ase.fixed-top')?.offsetHeight || 0;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - navbarHeight - 10; // 10px de margem extra

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. NAVBAR QUE MUDA DE ESTILO AO ROLAR
    const navbar = document.querySelector('.navbar-ase.fixed-top');
    const scrollThresholdNavbar = 50; // Distância em pixels para ativar a mudança

    if (navbar) {
        const handleScrollNavbar = () => {
            if (window.scrollY > scrollThresholdNavbar) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScrollNavbar);
        handleScrollNavbar(); // Executa uma vez no carregamento caso a página já esteja rolada
    }
    /*
    CSS NECESSÁRIO NO style.css para a Navbar Scrolled:
    .navbar-ase {
        transition: padding 0.3s ease-in-out, background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    }
    .navbar-ase.scrolled {
        padding-top: 0.5rem !important;
        padding-bottom: 0.5rem !important;
        background-color: var(--ase-secondary) !important; // Ou uma cor com opacidade: rgba(10, 25, 47, 0.95)
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
    */


    // 3. ANIMAÇÃO EM ELEMENTOS AO ROLAR (INTERSECTION OBSERVER)
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0 && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observerInstance.unobserve(entry.target); // Anima apenas uma vez
                }
            });
        }, {
            threshold: 0.15 // 15% do elemento visível para disparar
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
    /*
    CSS NECESSÁRIO NO style.css para Animação ao Rolar:
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.6s ease-out, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .animate-on-scroll.is-visible {
        opacity: 1;
        transform: translateY(0);
    }
    */


    // 4. BOTÃO "VOLTAR AO TOPO"
    const backToTopButton = document.createElement('button');
    backToTopButton.id = 'backToTopBtn';
    backToTopButton.title = 'Voltar ao topo';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);

    const scrollOffsetToShowButton = 300;

    const handleScrollButton = () => {
        if (window.scrollY > scrollOffsetToShowButton) {
            backToTopButton.style.display = "block";
            setTimeout(() => backToTopButton.style.opacity = "1", 10); // Pequeno delay para transição de opacidade
        } else {
            backToTopButton.style.opacity = "0";
            setTimeout(() => {
                 if (!(window.scrollY > scrollOffsetToShowButton)) { // Verifica novamente antes de esconder
                    backToTopButton.style.display = "none";
                 }
            }, 300); // Tempo da transição CSS
        }
    };

    window.addEventListener('scroll', handleScrollButton);
    handleScrollButton(); // Verifica no carregamento

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
    /*
    CSS NECESSÁRIO NO style.css para o Botão "Voltar ao Topo":
    #backToTopBtn {
        display: none;
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 1030; // Acima da navbar, se necessário
        border: none;
        outline: none;
        background-color: var(--ase-primary);
        color: var(--ase-secondary);
        cursor: pointer;
        padding: 0; // Removido padding para controlar com width/height
        width: 45px;
        height: 45px;
        border-radius: 50%;
        font-size: 18px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        opacity: 0;
        transition: opacity 0.3s ease-in-out, background-color 0.3s ease-in-out, transform 0.2s ease;
        display: flex; // Para centralizar o ícone
        align-items: center;
        justify-content: center;
    }
    #backToTopBtn:hover {
        background-color: var(--ase-primary-darker);
        transform: scale(1.1);
    }
    */


    // 5. VALIDAÇÃO BÁSICA DO FORMULÁRIO DE CONTATO
    const contactForm = document.querySelector('.contact-form'); // Certifique-se que seu form tem essa classe

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');

            // Remove mensagens de erro antigas
            contactForm.querySelectorAll('.error-message').forEach(msg => msg.remove());

            requiredFields.forEach(field => {
                field.classList.remove('is-invalid'); // Remove classe de erro do Bootstrap
                if (field.value.trim() === '') {
                    isValid = false;
                    field.classList.add('is-invalid');
                    displayError(field, `${field.previousElementSibling.innerText.replace('*','').trim()} é obrigatório.`);
                } else if (field.type === 'email' && !isValidEmail(field.value.trim())) {
                    isValid = false;
                    field.classList.add('is-invalid');
                    displayError(field, 'Por favor, insira um e-mail válido.');
                }
            });

            if (!isValid) {
                event.preventDefault(); // Impede o envio do formulário
            } else {
                // Opcional: mostrar uma mensagem de "enviando..." ou desabilitar o botão
                // contactForm.querySelector('button[type="submit"]').disabled = true;
                // contactForm.querySelector('button[type="submit"]').innerText = "Enviando...";
            }
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function displayError(field, message) {
        const error = document.createElement('div');
        error.className = 'error-message text-danger small mt-1'; // Classes Bootstrap para erro
        error.innerText = message;
        // Insere a mensagem de erro após o campo
        field.parentNode.insertBefore(error, field.nextSibling);
    }
    /*
    CSS OPCIONAL NO style.css para mensagens de erro (Bootstrap já deve cuidar de .is-invalid):
    .error-message {
        font-size: 0.875em;
    }
    .form-control.is-invalid { // Apenas para reforçar, Bootstrap já faz isso
        border-color: #dc3545;
    }
    */

}); // Fim do DOMContentLoaded