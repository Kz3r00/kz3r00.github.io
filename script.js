document.addEventListener('DOMContentLoaded', function() {
    // Mensagens diárias
    const mensagens = {
        0: { texto: "Feliz Domingo! Que tal um café da manhã especial hoje?", imagem: "imagens/Domingo.png" },
        1: { texto: "Boa Segunda! Seu sorriso ilumina minha semana.", imagem: "imagens/Segunda.png" },
        2: { texto: "Terça-feira é mais bonita com você na minha vida.", imagem: "imagens/Terca.png" },
        3: { texto: "Quarta-feira: já estou com saudades...", imagem: "imagens/Quarta.png" },
        4: { texto: "Quinta-feira: cada dia te amo mais.", imagem: "imagens/Quinta.png" },
        5: { texto: "Sexta-feira! hoje sou grato por ter você na minha vida, mesmo que seja à distância.", imagem: "imagens/Sexta.png" },
        6: { texto: "Sábado perfeito é aquele que passo pensando em você.", imagem: "imagens/Sabado.png" }
    };

    // Menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    menuToggle.addEventListener('click', function() {
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    // Atualiza mensagem e imagem do dia
    const dia = new Date().getDay();
    const mensagemDia = mensagens[dia];
    
    document.querySelector('.texto-dia').textContent = mensagemDia.texto;
    document.querySelector('.imagem-dia').innerHTML = `<img src="${mensagemDia.imagem}" alt="Imagem do dia">`;
});
/* ===== SISTEMA DE HISTÓRICO ===== */
const historico = {
  salvar: (tipo, valor) => {
    const registro = {
      tipo: tipo,
      valor: valor,
      data: new Date().toLocaleString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    
    const historicoAtual = JSON.parse(localStorage.getItem('nossoHistorico') || '[]');
    historicoAtual.push(registro);
    localStorage.setItem('nossoHistorico', JSON.stringify(historicoAtual));
  },

  exportar: () => {
    const dados = JSON.parse(localStorage.getItem('nossoHistorico') || '[]');
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `historico-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  }
};

// Atalho secreto (Shift + Alt + H)
document.addEventListener('keydown', (e) => {
  if (e.shiftKey && e.altKey && e.key === 'H') {
    historico.exportar();
    alert('💖 Histórico exportado! Verifique seus downloads.');
  }
});
