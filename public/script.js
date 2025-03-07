document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fazendo o fetch para obter os pratos do servidor
        const response = await fetch('http://localhost:3000/api/prato');
        console.log('Resposta da API:', response);  // Verifique o status e o conteúdo
        const pratos = await response.json();
        console.log('Pratos recebidos do servidor:', pratos);

        // Obtém a referência à tabela
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
                <td>R$ ${parseFloat(prato.preco).toFixed(2)}</td>
                <td>${prato.descricao}</td>
                <td>
                    <button class="select-btn" id="btn-${prato.id}">●</button>
                    <div class="quantity-input" id="input-${prato.id}" style="display: none;">
                        <input type="number" min="1" value="1" id="quantidade-${prato.id}">
                    </div>
                </td>
            `;
            tabela.appendChild(linha);

            // Adiciona o event listener para o botão de seleção
            const botaoSelecionar = document.getElementById(`btn-${prato.id}`);
            botaoSelecionar.addEventListener('click', () => selecionarPrato(prato, botaoSelecionar));
        });

    } catch (error) {
        console.error('Erro ao carregar os pratos:', error);
    }
});

// Função para selecionar ou desmarcar o prato
let pratosSelecionados = [];

async function selecionarPrato(prato, botao) {
    const index = pratosSelecionados.indexOf(prato);
    const inputQuantidade = document.getElementById(`input-${prato.id}`);
    const quantidadeInput = document.getElementById(`quantidade-${prato.id}`).value;

    console.log("Prato selecionado:", prato);
    
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


// Definição das mesas
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fazendo o fetch para obter as mesas do servidor
        const response = await fetch('http://localhost:3000/api/mesa');
        console.log('Resposta da API:', response);  // Verifique o status e o conteúdo
        const mesas = await response.json();
        console.log('Mesas recebidas do servidor:', mesas);

        // Função para gerar as opções de mesa no select e exibir quadrados de disponibilidade
        async function gerar_mesa() {
            let select = document.getElementById("mesa");
            let container = document.getElementById("mesas-container");

            container.innerHTML = '';  // Limpa o container antes de adicionar novas mesas

            mesas.forEach(mesa => {
                // Definir a disponibilidade com base no número da mesa
                const disponibilidade = mesa.disponibilidade == 1 ? true : false;

                // Criando a opção no select
                let nova_opcao = new Option(mesa.nome, mesa.id);
                select.options[select.options.length] = nova_opcao;

                // Criando o quadrado para representar a mesa
                let divMesa = document.createElement('div');
                divMesa.classList.add('mesa');
                divMesa.id = `mesa${mesa.numero}`;

                // Alterando a classe de cor do quadrado de acordo com a disponibilidade
                if (disponibilidade) {
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

        // Chama a função para gerar as mesas no select e exibir os quadrados
        await gerar_mesa();

        // Função para atualizar as cores dos quadrados de mesa conforme disponibilidade
        async function atualizarMesas() {
            mesas.forEach(mesa => {
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
        
        await atualizarMesas();
    } catch (error) {
        console.error('Erro ao carregar as mesas:', error);
        alert('Erro ao carregar as mesas. Verifique o console para mais detalhes.');
    }
});

// Chama a função para atualizar as mesas ao carregar a página
document.addEventListener('DOMContentLoaded', async () => {
    await atualizarMesas();
});

// Carregar garçons
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Faz a requisição para a API
        const response = await fetch('http://localhost:3000/api/garcom');
        console.log('Resposta da API:', response);  // Verifique o status e o conteúdo
        
        if (!response.ok) {
            throw new Error('Erro ao carregar dados da API');
        }

        // Obtém os dados JSON da resposta
        const garcons = await response.json();
        console.log('Mesas recebidas do servidor:', garcons);

        // Função para gerar as opções de garçom no select
        async function gerar_garcom() {
            let select = document.getElementById("garcom");
            // Supondo que a variável 'garcons' já tenha os dados dos garçons
            garcons.forEach(garcom => {
                let nova_opcao = new Option(garcom.nome, garcom.id);
                select.options[select.options.length] = nova_opcao;
            });
        }

        // Chama a função para gerar os garçons no select
        await gerar_garcom();
        
    } catch (error) {
        console.error('Erro ao carregar ou processar os dados:', error);
    }
});
document.getElementById("numero_cliente").addEventListener("input", async function(event) {
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

// Função para limpar o formulário
async function limparFormulario() {
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
document.getElementById("finalizar-btn").addEventListener("click", async () => {
    await Salvar_pedido();
});

// Lista para armazenar os pedidos
let pedidosRealizados = [];

async function gerarTabelaClientes() {
    const tabelaClientes = document.getElementById("clientes_valor");
    
    if (!tabelaClientes) {
        console.error("Elemento com id 'clientes_valor' não encontrado.");
        return;
    }

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

    try {
        // Obter pedidos do banco de dados
        const responsePedidos = await fetch('http://localhost:3000/api/pedidos');
        if (!responsePedidos.ok) {
            console.error('Erro ao carregar pedidos', responsePedidos.status);
            return;
        }
        const pedidos = await responsePedidos.json();

        const responseClientes = await fetch('http://localhost:3000/api/clientes');
        if (!responseClientes.ok) {
            console.error('Erro ao carregar clientes', responseClientes.status);
            return;
        }
        const clientes = await responseClientes.json();

        const responsePratoPedido = await fetch('http://localhost:3000/api/pedidoprato');
        if (!responsePratoPedido.ok) {
            console.error('Erro ao carregar pratos dos pedidos', responsePratoPedido.status);
            return;
        }
        const pedidosPratos = await responsePratoPedido.json();

        const pratosResponse = await fetch('http://localhost:3000/api/prato');
        if (!pratosResponse.ok) {
            console.error('Erro ao carregar pratos', pratosResponse.status);
            return;
        }
        const pratos = await pratosResponse.json();

        // Adicionar os clientes na tabela
        for (const pedido of pedidos) {
            // Buscar o cliente
            const cliente = clientes.find(cliente => cliente.id_cliente == pedido.cliente_id);
            console.log("Pedidos recebidos do servidor:", pedidos);
            console.log("Clientes recebidos do servidor:", clientes);
            
            if (!cliente) {
                console.error(`Cliente com ID ${pedido.cliente_id} não encontrado.`);
                continue; // Pula para o próximo pedido
            }

            // Buscar os pratos pedidos
            const pratoPedido = pedidosPratos.filter(pedidoPrato => pedidoPrato.pedido_id == pedido.id);
            let total = 0;

            // Calcular o total dos pratos pedidos
            for (const item of pratoPedido) {
                const prato = pratos.find(prato => prato.id == item.prato_id);
                if (prato) {
                    total += (parseFloat(prato.preco) * parseFloat(item.quantidade)); // Ajuste conforme a estrutura de dados
                } else {
                    console.error(`Prato com ID ${item.prato_id} não encontrado.`);
                }
            }

            total=total*(1.05)

            // Agora, criamos a linha para o cliente
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${cliente.nome}</td>
                <td>Mesa ${String(pedido.mesa)}</td>
                <td>${total.toFixed(2)}</td>
                <td><button onclick="registrarPagamento(${cliente.id})">Pagar</button></td>
            `;
            tabelaClientes.appendChild(linha);
        }
    } catch (error) {
        console.error('Erro ao gerar a tabela de clientes:', error);
    }
}

// Chama a função para gerar a tabela de clientes ao carregar a página
document.addEventListener('DOMContentLoaded', async () => {
    await gerarTabelaClientes();
});

/*// Adiciona o evento para o botão de pagamento
        const botaoExcluir = linha.querySelector(".excluir-btn");
        botaoExcluir.addEventListener('click', async () => {
            await registrarPagamento(pedido.id, mesa);
        }); */
/*
async function registrarPagamento(pedidoId, mesa) {
    try {
        // Excluir pedido do banco de dados
        await fetch(`http://localhost:3000/api/pedido/${pedidoId}`, { method: 'DELETE' });

        // Atualizar a disponibilidade da mesa
        await fetch(`http://localhost:3000/api/mesa/${mesa.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ disponibilidade: 1 }) // Define a mesa como disponível
        });

        // Atualizar a tabela de clientes e a visualização das mesas
        await gerarTabelaClientes();
        await atualizarMesas();
    } catch (error) {
        console.error('Erro ao registrar pagamento:', error);
    }
}

async function atualizarMesas() {
    try {
        const responseMesas = await fetch('http://localhost:3000/api/mesa');
        const mesas = await responseMesas.json();

        const container = document.getElementById("mesas-container");
        container.innerHTML = '';

        mesas.forEach(mesa => {
            const divMesa = document.createElement('div');
            divMesa.classList.add('mesa');
            divMesa.id = `mesa${mesa.numero}`;

            if (mesa.disponibilidade==1) {
                divMesa.classList.add('disponivel');
            } else {
                divMesa.classList.add('indisponivel');
            }

            divMesa.innerHTML = mesa.nome;
            container.appendChild(divMesa);
        });
    } catch (error) {
        console.error('Erro ao atualizar mesas:', error);
    }
}*/
/*
async function calcularTotalPedido(pedidoId) {
    const responsePedidoPratos = await fetch(`http://localhost:3000/api/pedido_prato?pedido_id=${pedidoId}`);
    const pedidoPratos = await responsePedidoPratos.json();

    let total = 0;
    for (const pedidoPrato of pedidoPratos) {
        const prato = await fetch(`http://localhost:3000/api/pratos/${pedidoPrato.prato_id}`).then(res => res.json());
        total += prato.preco * pedidoPrato.quantidade;
    }

    return total;
}
*/

// Função para excluir o cliente e atualizar a disponibilidade da mesa
/*
async function excluirCliente(index, mesa) {
    // Remover o pedido da lista
    pedidosRealizados.splice(index, 1);

    // Atualizar a disponibilidade da mesa
    await mesa.atualizarDisponibilidade(true);

    // Atualizar a tabela de clientes e a visualização das mesas
    await gerarTabelaClientes();
}
    */


async function Salvar_pedido() {
    try {
        let garcom_escolhido = document.getElementById("garcom").value;
        if (garcom_escolhido.length==0){
            alert ("Escolha um garçom ou garçonete")
            return;
        }
        let mesa_escolhida = parseInt(document.getElementById('mesa').value);
        if (mesa_escolhida.length==0){
            alert ("Escolha uma mesa")
            return;
        }

        // Encontrar a mesa selecionada no banco de dados
        const response_mesas = await fetch('http://localhost:3000/api/mesa');
        const mesas = await response_mesas.json();
        let mesaSelecionada = mesas.find(mesa => mesa.id == mesa_escolhida);

        // Verificar se a mesa está disponível
        if (mesaSelecionada.disponibilidade == 0) {
            alert("Esta mesa não está disponível.");
            return; 
        }

        // Verificar se há pratos selecionados
        if (pratosSelecionados.length === 0) {
            alert("Você precisa selecionar pelo menos um prato para realizar o pedido.");
            return; 
        }

        let nome = document.getElementById("nome_cliente").value;
        if (nome.length==0){
            alert('Preencha o campo "Nome do Cliente"')
        }
        let numero = document.getElementById("numero_cliente").value;
        if (numero.length==0){
            alert('Preencha o campo "Número para contato"')
        }
        
        // Criar o cliente no banco de dados
        const response_cliente = await fetch('http://localhost:3000/api/clientes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, numero })
        });

        if (!response_cliente.ok) {
            const errorDetails = await response_cliente.json();
            throw new Error(`Erro ao cadastrar cliente: ${errorDetails.message || 'Erro desconhecido'}`);
        }
        
        const cliente = await response_cliente.json(); // Resposta do cliente cadastrado
        console.log(cliente.id)

        let cliente_id=parseInt(cliente.id)
        let mesa=parseInt(mesaSelecionada.id)

        // Registrar o pedido no banco de dados
        const response_pedido = await fetch('http://localhost:3000/api/pedidos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({cliente_id, mesa})
        });

        if (!response_pedido.ok) {
            const errorDetails = await response_pedido.json();
            throw new Error(`Erro ao salvar pedido: ${errorDetails.message || 'Erro desconhecido'}`);
        }

        const pedido = await response_pedido.json(); // Recebe o pedido salvo com ID
        
        // Array para armazenar os pratos do pedido
        let pratos_quantidade = [];

        // Percorrer todos os pratos selecionados e armazenar no banco de dados
        for (let prato of pratosSelecionados) {
            const quantidade = document.getElementById(`quantidade-${prato.id}`).value;

            // Salvar o prato do pedido na tabela 'pedido_prato'
            const response_pedido_prato = await fetch('http://localhost:3000/api/pedidoprato', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pedido_id: pedido.id,
                    prato_id: prato.id,
                    quantidade: parseInt(quantidade)
                })
            });

            if (!response_pedido_prato.ok) {
                const errorDetails = await response_pedido_prato.json();
                throw new Error(`Erro ao salvar prato do pedido: ${errorDetails.message || 'Erro desconhecido'}`);
            }

            pratos_quantidade.push({
                prato_preco: parseInt(prato.preco),
                quantidade: parseInt(quantidade)
            });
        }

        // Registrar o garçom selecionado
        const response_garcom = await fetch('http://localhost:3000/api/garcom');
        const garcons = await response_garcom.json();
        let garcomSelecionado = garcons.find(g => g.id == garcom_escolhido);

        // Calcular o total do pedido
        let totalPedido = pratos_quantidade.reduce((acc, item) => acc + (parseFloat(item.quantidade) * parseFloat(item.prato_preco)), 0);
        console.log(totalPedido)

        // Verificar se a taxa do garçom é uma porcentagem ou valor fixo
        let totalConta;

        totalConta = totalPedido*(1+parseFloat(garcomSelecionado.taxa)); 
        console.log(garcomSelecionado.taxa)
        
        // Atualizar a disponibilidade da mesa para 'indisponível' no banco de dados
        const response_atualizar_mesa = await fetch(`http://localhost:3000/api/mesa`)
            /*method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ disponibilidade: 0 }) // Indisponível*/
        

        if (!response_atualizar_mesa.ok) {
            throw new Error('Erro ao atualizar disponibilidade da mesa');
        }
        
        //await gerarTabelaClientes();
        //await atualizarMesas();

        await limparFormulario();
        
        alert(`Pedido realizado com sucesso! Total + taxa do garçom: R$ ${totalConta.toFixed(2)}`);
    } catch (error) {
        console.error('Erro ao salvar o pedido:', error);
        alert('Houve um erro ao realizar o pedido. Tente novamente.');
    }
}


/*// Definição dos pratos

let pedidosRealizados = [];

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
}

// Função para salvar o pedido
async function Salvar_pedido() {
    //salvando o cliente
    let nome = document.getElementById("nome_cliente").value;
    let numero = document.getElementById("numero_cliente").value;
    const response = await fetch('http://localhost:3000/api/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome , numero })
      });
  
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Erro ao cadastrar cliente: ${errorDetails.message || 'Erro desconhecido'}`);
      }
    
    let garcom_escolhido = document.getElementById("garcom").value;
    let mesa_escolhida = document.getElementById('mesa').value;

    // Encontrar a mesa selecionada
    const response_mesas = await fetch('http://localhost:3000/api/mesa');
    console.log('Resposta da API:', response_mesas);  // Verifique o status e o conteúdo
    const mesas = await response.json();
    console.log('Mesas recebidas do servidor:', mesas);
    let mesaSelecionada =mesas.find(mesa => mesa.id == mesa_escolhida);

    // Verificar se a mesa está disponível
    if (mesaSelecionada.disponibilidade==0) {
        alert("Esta mesa não está disponível.");
        return;  // Não permite que o pedido seja realizado se a mesa não estiver disponível
    }

    // Verificar se há pratos selecionados
    if (pratosSelecionados.length === 0) {
        alert("Você precisa selecionar pelo menos um prato para realizar o pedido.");
        return;  // Não permite o pedido sem pratos selecionados
    }

    //falta

    // Array para armazenar a contagem de pratos
let pratos_quantidade = [];

// Percorrer todos os pratos selecionados
pratosSelecionados.forEach(prato => {
    const quantidade = document.getElementById(`quantidade-${prato.id}`).value;
    
    // Verifica se o prato já existe no array pratos_quantidade
    let pratoExistente = pratos_quantidade.find(item => item.prato_id == prato.id);
    
    if (pratoExistente) {
        // Se o prato já existe, soma a quantidade
        pratoExistente.quantidade += parseInt(quantidade);
    } else {
        // Se não existe, cria um novo objeto no formato desejado
        pratos_quantidade.push({
            prato_id: prato.id,
            quantidade: parseInt(quantidade)
        });
    }
    
});

    // Registrar o pedido e calcular a conta
    const response_garcom = await fetch('http://localhost:3000/api/garcom');
    console.log('Resposta da API:', response_garcom);  // Verifique o status e o conteúdo
    const garcons = await response.json();
    console.log('Mesas recebidas do servidor:', garcons);
    let garcomSelecionado = garcons.find(g => g.id === garcom_escolhido);
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
*/