// Smooth scrolling e highlight da navegação ativa
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Função para destacar link ativo na navegação
    function highlightActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }
    
    // Adicionar event listener para scroll
    window.addEventListener('scroll', highlightActiveLink);
    
    // Smooth scroll para links de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Considera altura do header fixo
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animação de entrada para elementos quando entram na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplicar animação aos elementos principais
    const animatedElements = document.querySelectorAll(
        '.section-title, .hero-content, .objective-content, .solution-parts, ' +
        '.workflow-diagram, .risks-list, .stack-content, .timeline-part, ' +
        '.commercial-scenarios, .contact-content'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(element);
    });
    
    // Efeito parallax sutil no hero
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Hover effects para workflow steps
    const workflowSteps = document.querySelectorAll('.step-box');
    workflowSteps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Counter animation para preços
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target.toLocaleString('pt-BR');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start).toLocaleString('pt-BR');
            }
        }, 16);
    }
    
    // Observar seção comercial para animar números (apenas Cenário B)
    const commercialSection = document.querySelector('.commercial-section');
    if (commercialSection) {
        const commercialObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const priceElements = entry.target.querySelectorAll('.price-value');
                    priceElements.forEach(price => {
                        const text = price.textContent;
                        // Apenas anima o Cenário B
                        if (text.includes('10.900')) {
                            price.textContent = 'R$ 0/mês';
                            setTimeout(() => {
                                price.textContent = 'R$ 10.900/mês';
                            }, 1000);
                        }
                        // Cenário A mantém valor fixo
                    });
                    commercialObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        commercialObserver.observe(commercialSection);
    }
    
    // Mobile menu toggle (caso necessário no futuro)
    function createMobileMenu() {
        const nav = document.querySelector('.nav-header');
        const menu = document.querySelector('.nav-menu');
        
        if (window.innerWidth <= 768) {
            if (!nav.querySelector('.mobile-toggle')) {
                const toggle = document.createElement('button');
                toggle.className = 'mobile-toggle';
                toggle.innerHTML = '☰';
                toggle.style.cssText = `
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: var(--gray-700);
                `;
                
                toggle.addEventListener('click', function() {
                    menu.style.display = menu.style.display === 'none' ? 'flex' : 'none';
                });
                
                nav.appendChild(toggle);
            }
        }
    }
    
    window.addEventListener('resize', createMobileMenu);
    createMobileMenu();
    
    // Destacar primeiro link ao carregar página
    highlightActiveLink();
});