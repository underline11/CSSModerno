/* Small JS for interactivity: burger menu, submenu toggles, form validation, toast and modal */
document.addEventListener('DOMContentLoaded', function(){
  const burger = document.getElementById('burgerBtn');
  const menu = document.getElementById('menu');

  burger.addEventListener('click', function(){
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('show');
  });

  // submenu toggle (for keyboard)
  document.querySelectorAll('.sub-toggle').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      btn.nextElementSibling.style.display = expanded ? 'none' : 'block';
    });
  });

  // Modal example
  const modal = document.getElementById('modal');
  const modalClose = document.querySelector('.modal-close');
  document.querySelectorAll('.btn').forEach(b=>{
    b.addEventListener('click', (e)=>{
      if(b.textContent.trim() === 'Ver'){
        e.preventDefault();
        openModal();
      }
    })
  })
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });

  let lastFocused;
  function openModal(){
    lastFocused = document.activeElement;
    modal.setAttribute('aria-hidden','false');
    modal.querySelector('.modal-close').focus();
  }
  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    if(lastFocused) lastFocused.focus();
  }

  // Contact form validation + toast
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toast');

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(form.checkValidity()){
      showToast('Mensagem enviada com sucesso!');
      form.reset();
    } else {
      // add visual invalid hints
      form.querySelectorAll('input,textarea').forEach(el=>{
        if(!el.checkValidity()) el.classList.add('invalid');
        else el.classList.remove('invalid');
      });
      showToast('Por favor, corrija os campos destacados.', true);
    }
  });

  function showToast(text, isError=false){
    toast.textContent = text;
    toast.style.background = isError ? 'var(--color-danger)' : 'var(--color-neutral-900)';
    toast.classList.add('show');
    setTimeout(()=>toast.classList.remove('show'), 3500);
  }
});
