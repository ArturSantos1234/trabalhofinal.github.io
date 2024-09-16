function next1() { 
    const answer1 = parseFloat(document.getElementById('a1').value);
    const error1 = document.getElementById('error1');

    // Validação para verificar se o valor é um número válido
    if (isNaN(answer1) || answer1 <= 0) {
        error1.textContent = "Por favor, insira um valor numérico válido.";
    } else {
        error1.textContent = "";
        localStorage.setItem('salario', answer1); // Armazena o salário
        document.getElementById('q1').classList.remove('active');
        document.getElementById('q2').classList.add('active');
    }
}

function next2() {
    const answer2 = document.getElementById('a2').value;
    const error2 = document.getElementById('error2');

    // Validação para permitir apenas letras
    if (answer2.trim() === '' || /[^a-zA-Z\s]/.test(answer2)) {
        error2.textContent = "Por favor, insira um nome válido, apenas letras são permitidas.";
    } else {
        error2.textContent = "";
        localStorage.setItem('nome', answer2); // Armazena o nome do usuário
        document.getElementById('q2').classList.remove('active');
        document.getElementById('q3').classList.add('active');
    }
}

function next3() {
    const answer3 = document.getElementById('a3').value;
    const error3 = document.getElementById('error3');

    // Validação para permitir apenas letras
    if (answer3.trim() === '' || /[^a-zA-Z\s]/.test(answer3)) {
        error3.textContent = "Por favor, insira um dado válido, apenas letras são permitidas.";
    } else {
        error3.textContent = "";
        localStorage.setItem('idade', answer3); // Armazena a idade
        document.getElementById('q3').classList.remove('active');
        document.getElementById('q4').classList.add('active');
    }
}

function finalizar() {
    const answer4 = parseFloat(document.getElementById('a4').value);
    const error4 = document.getElementById('error4');

    // Validação para verificar se o valor é numérico
    if (isNaN(answer4)) {
        error4.textContent = "Por favor, insira um valor numérico.";
    } else {
        error4.textContent = "";
        window.location.href = "inicio.html"; // Redireciona para a página inicial
    }
}
