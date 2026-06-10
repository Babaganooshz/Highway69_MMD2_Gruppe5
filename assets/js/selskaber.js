document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const answer = btn.nextElementSibling;
        const isOpen = answer.classList.contains('open');

        // Luk alle
        document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
        document.querySelectorAll('.faq-question').forEach(b => b.setAttribute('aria-expanded', 'false'));

        // Åbn den klikkede, hvis den ikke allerede var åben
        if (!isOpen) {
            answer.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
        }
    });
});