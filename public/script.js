import { Prato } from "../dist/Prato.js";
import { Mesa } from "../dist/Mesa.js";
import { Garcom } from "../dist/Garcom.js";
import { Cliente } from "../dist/Cliente.js";
import { Pedido } from "../dist/Pedido.js";

// Definição dos pratos
let item1 = new Prato('X-Braga', 13, 'Pão, Hambúrguer Smash, Cheddar e Molho da casa');
let item2 = new Prato('Duplo Braga', 20, 'Pão, 2 Hambúrguer Smash, Cheddar e Molho da casa');
let item3 = new Prato('Clássico Bacurau', 15, 'Pão, Hambúrguer de Crane de Sol, Queijo de Coalho, Cebola Roxa e Molho da casa');
let item4 = new Prato('Garcia Burguer', 16, 'Pão, Hambúrguer de Frango, Queijo sem lactose e Molho da casa');
let item5 = new Prato('Felix Vegetariano', 17, 'Pão, Hambúrguer de Soja assado na brasa, Alface, Tomate, Cebola e Molho da casa');
let item6 = new Prato('Batata Arante', 10, 'Batatas Fritas com tempero do chefe (acompanha Molho da casa)');
let item7 = new Prato('Batata Arante com Cheddar e Bacon', 15, 'Batatas Fritas com tempero do chefe, Cheddar e Bacon (acompanha Molho da casa)');
let item8 = new Prato('Anéis de Farias', 12, 'Anéis de Cebola fritos (acompanha molho)');
let item9 = new Prato('Giva Shake de Morango', 16, 'Milk Shake de morango com calda de morango batido na hora');
let item10 = new Prato('Giva Shake de Ninho com Nutella', 18, 'Milk Shake de Ninho com cobertura de Nutella batido na hora');
let item11 = new Prato('Petit Gateau a La França', 22, 'Petit Gateau de chocolate com soverte de creme e calda de chocolate');
let item12 = new Prato('Refrigerante 2L', 15, 'Coca-Cola, Cajuína, Guaraná, Sprite');
let item13 = new Prato('Refrigerante 1L', 10, 'Coca-Cola, Cajuína, Guaraná, Pepsi');
let item14 = new Prato('Refrigerante Latinha', 6, 'Coca-Cola, Guaraná, Sprite');
let item15 = new Prato('Suco (Copo)', 7, 'Limão, Morango, Maracujá e Laranja');
let item16 = new Prato('Suco (Jarra)', 15, 'Limão, Morango, Maracujá e Laranja');

let pratos = [item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11, item12, item13, item14, item15, item16];

// Função para gerar os pratos na tabela
function gerar_Pratos() {
    const tabela = document.getElementById('tabela_pratos');
    tabela.innerHTML = "";

    // Cabeçalho da tabela
    const cabecalho = document.createElement('tr');
    cabecalho.innerHTML = `
        <th>Nome</th>
        <th>Preço</th>
        <th>Descrição</th>
        <th>Selecionar</th>
    `;
    tabela.appendChild(cabecalho);

    // Adiciona os pratos na tabela
    pratos.forEach(prato => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${prato.nome}</td>
            <td>R$ ${prato.preco.toFixed(2)}</td>
            <td>${prato.descricao}</td>
            <td>
                <button class="select-btn" id="btn-${prato.nome}">●</button>
                <div class="quantity-input" id="input-${prato.nome}">
                    <input type="number" min="1" value="1" id="quantidade-${prato.nome}">
                </div>
            </td>
        `;
        tabela.appendChild(linha);

        // Adiciona o event listener para o botão de seleção
        const botaoSelecionar = document.getElementById(`btn-${prato.nome}`);
        botaoSelecionar.addEventListener('click', () => selecionarPrato(prato, botaoSelecionar));
    });
}

// Função para selecionar ou desmarcar o prato
let pratosSelecionados = [];

function selecionarPrato(prato, botao) {
    const index = pratosSelecionados.indexOf(prato);
    const inputQuantidade = document.getElementById(`input-${prato.nome}`);
    const quantidadeInput = document.getElementById(`quantidade-${prato.nome}`).value;

    if (index === -1) {
        // Adiciona o prato ao pedido e muda o botão para azul
        pratosSelecionados.push(prato);
        botao.classList.add('selected');  // Aplica o estilo de botão selecionado
        inputQuantidade.style.display = 'inline-block';  // Exibe o campo de quantidade
        botao.innerHTML = '✓'; // Muda o ícone para "✓"
    } else {
        // Remove o prato do pedido e volta o botão para o estado inicial
        pratosSelecionados.splice(index, 1);
        botao.classList.remove('selected');
        inputQuantidade.style.display = 'none';  // Esconde o campo de quantidade
        botao.innerHTML = '●';  // Muda o ícone para "●" novamente
    }
}

// Chama a função para gerar os pratos na tabela
gerar_Pratos();

// Definição das mesas
let mesa1 = new Mesa("mesa 1",1);
let mesa2 = new Mesa("mesa 2",2);
let mesa3 = new Mesa("mesa 3",3);
let mesa4 = new Mesa("mesa 4",4);
let mesa5 = new Mesa("mesa 5",5);
let mesa6 = new Mesa("mesa 6",6);
let mesa7 = new Mesa("mesa 7",7);
let mesa8 = new Mesa("mesa 8",8);
let mesa9 = new Mesa("mesa 9",9);
let mesa10 = new Mesa("mesa 10",10);

let mesas_restaurante = [mesa1, mesa2, mesa3, mesa4, mesa5, mesa6, mesa7, mesa8, mesa9, mesa10];

// Função para gerar as opções de mesa no select e exibir quadrados de disponibilidade
function gerar_mesa() {
    let select = document.getElementById("mesa");
    let container = document.getElementById("mesas-container");
    
    container.innerHTML = '';

    mesas_restaurante.forEach(mesa => {

        let nova_opcao = new Option(mesa.nome, mesa.numero);
        select.options[select.options.length] = nova_opcao;

        // Criando o quadrado para representar a mesa
        let divMesa = document.createElement('div');
        divMesa.classList.add('mesa');
        divMesa.id = `mesa${mesa.numero}`;

        // Alterando a classe de cor do quadrado de acordo com a disponibilidade
        if (mesa.disponibilidade) {
            divMesa.classList.add('disponivel'); // Verde
        } else {
            divMesa.classList.add('indisponivel'); // Vermelho
        }

        // Adicionando o nome da mesa dentro do quadrado
        divMesa.innerHTML = mesa.nome;  // Exibe o nome da mesa

        // Adiciona o quadrado ao container
        container.appendChild(divMesa);
    });
}




// Chama a função para gerar as mesas no select
gerar_mesa();

// Função para atualizar as cores dos quadrados de mesa conforme disponibilidade
function atualizarMesas() {
    mesas_restaurante.forEach(mesa => {
        const mesaElement = document.getElementById(`mesa${mesa.numero}`);
        if (mesa.disponibilidade) {
            mesaElement.classList.add('disponivel');
            mesaElement.classList.remove('indisponivel');
        } else {
            mesaElement.classList.add('indisponivel');
            mesaElement.classList.remove('disponivel');
        }
    });
}


// Chama a função para atualizar as mesas ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    atualizarMesas();
});



// Definição dos garçons
let garcom_1 = new Garcom("Gabriela");
let garcom_2 = new Garcom("Marina");
let garcom_3 = new Garcom("Bernardo");
let garcom_4 = new Garcom("Guilherme");

let garcons = [garcom_1, garcom_2, garcom_3, garcom_4];

// Função para gerar as opções de garçom no select
function gerar_garcom() {
    let select = document.getElementById("garcom");
    garcons.forEach(garcom => {
        let nova_opcao = new Option(garcom.nome, garcom.nome);
        select.options[select.options.length] = nova_opcao;
    });
}

// Chama a função para gerar os garçons no select
gerar_garcom();

// Lista para armazenar os pedidos
let pedidosRealizados = [];

// Função para salvar o pedido
// Função para gerar a tabela de clientes e valores
function gerarTabelaClientes() {
    const tabelaClientes = document.getElementById("clientes_valor");
    tabelaClientes.innerHTML = "";

    // Cabeçalho da tabela
    const cabecalho = document.createElement('tr');
    cabecalho.innerHTML = `
        <th>Nome do Cliente</th>
        <th>Mesa</th>
        <th>Total</th>
        <th>Registrar pagamento</th>
    `;
    tabelaClientes.appendChild(cabecalho);

    // Adicionar os clientes na tabela
    pedidosRealizados.forEach((pedidoRealizado, index) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${pedidoRealizado.cliente.nome}</td>
            <td>${pedidoRealizado.mesa.nome}</td>
            <td>R$ ${pedidoRealizado.total.toFixed(2)}</td>
            <td><button class="excluir-btn" data-index="${index}">Pago</button></td>
        `;
        tabelaClientes.appendChild(linha);

        // Adiciona o evento para o botão de excluir
        const botaoExcluir = linha.querySelector(".excluir-btn");
        botaoExcluir.addEventListener('click', () => excluirCliente(index, pedidoRealizado.mesa));
    });
}

// Função para excluir o cliente e atualizar a disponibilidade da mesa
function excluirCliente(index, mesa) {
    // Remover o pedido da lista
    pedidosRealizados.splice(index, 1);

    // Atualizar a disponibilidade da mesa
    mesa.atualizarDisponibilidade(true);

    // Atualizar a tabela de clientes e a visualização das mesas
    gerarTabelaClientes();
    atualizarMesas();
}

document.getElementById("numero_cliente").addEventListener("input", function(event) {
    let phoneNumber = event.target.value;

    // Remove todos os caracteres não numéricos
    phoneNumber = phoneNumber.replace(/\D/g, '');

    // Aplica a máscara enquanto o cliente digita
    if (phoneNumber.length <= 10) {
        // Mascara para números de 10 dígitos: (XX) XXXX-XXXX
        phoneNumber = phoneNumber.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    } else {
        // Mascara para números de 11 dígitos: (XX) XXXXX-XXXX
        phoneNumber = phoneNumber.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    }

    // Atualiza o valor do campo com a máscara em tempo real
    event.target.value = phoneNumber;
});


// Função para salvar o pedido
// Função para salvar o pedido
function Salvar_pedido() {
    let nome_cliente = document.getElementById("nome_cliente").value;
    let numero_cliente = document.getElementById("numero_cliente").value;
    let cliente = new Cliente(nome_cliente, numero_cliente);
    
    let garcom_escolhido = document.getElementById("garcom").value;
    let mesa_escolhida = document.getElementById('mesa').value;

    // Encontrar a mesa selecionada
    let mesaSelecionada = mesas_restaurante.find(mesa => mesa.numero == mesa_escolhida);

    // Verificar se a mesa está disponível
    if (!mesaSelecionada.disponibilidade) {
        alert("Esta mesa não está disponível.");
        return;  // Não permite que o pedido seja realizado se a mesa não estiver disponível
    }

    // Verificar se há pratos selecionados
    if (pratosSelecionados.length === 0) {
        alert("Você precisa selecionar pelo menos um prato para realizar o pedido.");
        return;  // Não permite o pedido sem pratos selecionados
    }

    // Criar o pedido
    let pedido = new Pedido(cliente);
    
    // Adicionar os pratos selecionados ao pedido
    pratosSelecionados.forEach(prato => {
        const quantidade = document.getElementById(`quantidade-${prato.nome}`).value;
        for (let i = 0; i < quantidade; i++) {
            pedido.adicionarPrato(prato);
        }
    });

    // Registrar o pedido e calcular a conta
    let garcomSelecionado = garcons.find(g => g.nome === garcom_escolhido);
    garcomSelecionado.registrarPedido(mesaSelecionada, pedido);
    let totalConta = garcomSelecionado.calcularConta(mesaSelecionada);

    // Armazenar o pedido na lista de pedidos realizados
    pedidosRealizados.push({
        cliente: cliente,
        mesa: mesaSelecionada,
        garcom: garcomSelecionado,
        pedido: pedido,
        total: totalConta
    });

    // Atualiza a disponibilidade da mesa para 'indisponível'
    mesaSelecionada.atualizarDisponibilidade(false);

    alert(`Pedido realizado com sucesso! Total + adicional do garçom: R$ ${totalConta.toFixed(2)}`);

    // Atualizar a tabela de clientes e as mesas
    gerarTabelaClientes();
    atualizarMesas();

    // Limpar o formulário para o próximo cliente
    limparFormulario();
}



// Chama a função para gerar a tabela de clientes ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    gerarTabelaClientes();
});


// Função para limpar o formulário
function limparFormulario() {
    // Limpar campos do formulário
    document.getElementById("nome_cliente").value = '';
    document.getElementById("numero_cliente").value = '';
    document.getElementById("mesa").selectedIndex = 0;
    document.getElementById("garcom").selectedIndex = 0;
    
    // Limpar pratos selecionados
    pratosSelecionados = [];
    const buttons = document.querySelectorAll('.select-btn');
    buttons.forEach(button => {
        button.innerHTML = '●';
        button.classList.remove('selected');
    });
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
        input.style.display = 'none';
        input.querySelector('input').value = 1;
    });
}

// Adicionando um event listener para o botão de finalizar
document.getElementById("finalizar-btn").addEventListener("click", Salvar_pedido);

console.log(pedidosRealizados)