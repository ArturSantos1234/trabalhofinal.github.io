window.onload = function() {
    // Exibir o salário na barra de navegação
    const salario = parseFloat(localStorage.getItem('salario'));
    if (!isNaN(salario)) {
        document.getElementById('mostrar-salario').textContent = 'Seu salário mensal é: R$ ' + salario.toLocaleString();
        atualizarBarraProgresso();
    } else {
        document.getElementById('mostrar-salario').textContent = 'Nenhum salário registrado.';
    }

    // Exibir o nome do usuário no main
    const nome = localStorage.getItem('nome');
    if (nome) {
        document.querySelector('main h2').textContent = `Bem-vindo, ${nome}!`;
    }
};

// Atualizar a barra de progresso
function atualizarBarraProgresso() {
    const salario = parseFloat(localStorage.getItem('salario'));
    let totalGastos = 0;

    // Somar todos os valores gastos
    document.querySelectorAll('.coluna ul').forEach(lista => {
        lista.querySelectorAll('li span').forEach(span => {
            const valor = parseFloat(span.textContent.split(': R$ ')[1]);
            if (!isNaN(valor)) {
                totalGastos += valor;
            }
        });
    });

    // Atualizar o valor do salário
    const saldo = salario - totalGastos;

    // Atualizar o texto do salário
    document.getElementById('mostrar-salario').textContent = `Seu salário mensal é: R$ ${saldo.toFixed(2)}`;

    // Atualizar a porcentagem e a barra de progresso
    const porcentagem = Math.min((totalGastos / salario) * 100, 100);
    const barra = document.getElementById('progress-bar-inner');
    const percentual = document.getElementById('percentual-gasto');

    percentual.textContent = porcentagem.toFixed(2) + '%';
    barra.style.width = porcentagem + '%';

    // Atualizar a cor da barra
    if (porcentagem < 50) {
        barra.style.backgroundColor = 'green';
    } else if (porcentagem < 80) {
        barra.style.backgroundColor = 'yellow';
    } else {
        barra.style.backgroundColor = 'red';
    }
}

// Função para adicionar item
function adicionarItem(categoria) {
    const categoriaLista = document.getElementById(categoria + '-lista');

    // Criar um novo input
    const novoItem = document.createElement('li');
    const inputItem = document.createElement('input');
    inputItem.type = 'text';
    inputItem.placeholder = 'Nome do item';
    
    // Botão para adicionar valor ao item
    const botaoAdicionar = document.createElement('button');
    botaoAdicionar.textContent = '+';
    botaoAdicionar.onclick = function() {
        const valorItem = parseFloat(prompt("Digite o valor:"));
        if (!isNaN(valorItem) && valorItem > 0) {
            const salario = parseFloat(localStorage.getItem('salario'));
            let totalGastos = 0;

            // Verificar se o valor do item excede o salário
            document.querySelectorAll('.coluna ul').forEach(lista => {
                lista.querySelectorAll('li span').forEach(span => {
                    const valor = parseFloat(span.textContent.split(': R$ ')[1]);
                    if (!isNaN(valor)) {
                        totalGastos += valor;
                    }
                });
            });

            const saldo = salario - totalGastos;
            if (valorItem > saldo) {
                alert('Gasto excede o saldo disponível!');
                return;
            }

            const novoGasto = document.createElement('span');
            novoGasto.textContent = inputItem.value + ': R$ ' + valorItem.toFixed(2);
            novoItem.innerHTML = '';
            novoItem.appendChild(novoGasto);

            // Adiciona o novo item na lista
            categoriaLista.appendChild(novoItem);

            // Atualiza a barra de progresso
            atualizarBarraProgresso();
        } else {
            alert('Por favor, insira um valor válido.');
        }
    };

    // Adiciona o input e o botão na lista
    novoItem.appendChild(inputItem);
    novoItem.appendChild(botaoAdicionar);

    // Adicionar o novo item antes do botão "Adicionar item"
    categoriaLista.appendChild(novoItem);
}
