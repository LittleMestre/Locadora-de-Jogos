
// DOM Elements
const gamesSectionEl = document.getElementById('games-section');
const cartSectionEl = document.getElementById('cart-section');
const checkoutSectionEl = document.getElementById('checkout-section');
const adminSectionEl = document.getElementById('admin-section');
const gamesContainerEl = document.getElementById('games-container');
const cartContainerEl = document.getElementById('cart-container');
const cartCountEl = document.getElementById('cart-count');
const checkoutItemsEl = document.getElementById('checkout-items');
const checkoutTotalEl = document.getElementById('checkout-total');
const gameFormEl = document.getElementById('game-form');
const adminGamesTableEl = document.getElementById('admin-games-table').querySelector('tbody');
const successModalEl = document.getElementById('success-modal');
const modalTitleEl = document.getElementById('modal-title');
const modalMessageEl = document.getElementById('modal-message');
const modalCloseEl = document.getElementById('modal-close');
const navGamesEl = document.getElementById('nav-games');
const navCartEl = document.getElementById('nav-cart');
const navAdminEl = document.getElementById('nav-admin');
const backToCartEl = document.getElementById('back-to-cart');
const confirmPaymentEl = document.getElementById('confirm-payment');
const installmentsContainerEl = document.getElementById('installments-container');
const installmentsEl = document.getElementById('installments');

// API URLs
const API_BASE_URL = '/api';
const GAMES_URL = `${API_BASE_URL}/games`;
const CART_URL = `${API_BASE_URL}/cart`;
const CHECKOUT_URL = `${API_BASE_URL}/checkout`;

// State
let games = [];
let cart = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  fetchGames();
  fetchCart();
  setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
  // Navigation
  navGamesEl.addEventListener('click', navigateTo('games'));
  navCartEl.addEventListener('click', navigateTo('cart'));
  navAdminEl.addEventListener('click', navigateTo('admin'));
  backToCartEl.addEventListener('click', navigateTo('cart'));
  
  // Admin Form
  gameFormEl.addEventListener('submit', handleGameFormSubmit);
  
  // Payment Form
  document.querySelectorAll('input[name="payment"]').forEach(input => {
    input.addEventListener('change', (e) => {
      installmentsContainerEl.classList.toggle('hidden', e.target.value !== 'credit');
      updateConfirmButtonState();
    });
  });
  
  confirmPaymentEl.addEventListener('click', handleCheckout);
  
  // Modal
  modalCloseEl.addEventListener('click', () => {
    successModalEl.classList.add('hidden');
  });
}

// Navigation Function
function navigateTo(section) {
  return (e) => {
    e && e.preventDefault();
    
    // Update active navigation
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    
    // Hide all sections
    gamesSectionEl.classList.add('hidden');
    cartSectionEl.classList.add('hidden');
    checkoutSectionEl.classList.add('hidden');
    adminSectionEl.classList.add('hidden');
    
    // Show selected section
    switch (section) {
      case 'games':
        gamesSectionEl.classList.remove('hidden');
        navGamesEl.classList.add('active');
        break;
      case 'cart':
        cartSectionEl.classList.remove('hidden');
        navCartEl.classList.add('active');
        renderCart();
        break;
      case 'checkout':
        checkoutSectionEl.classList.remove('hidden');
        navCartEl.classList.add('active');
        renderCheckout();
        break;
      case 'admin':
        adminSectionEl.classList.remove('hidden');
        navAdminEl.classList.add('active');
        renderAdminGames();
        break;
    }
  };
}

// Fetch games from API
async function fetchGames() {
  try {
    const response = await fetch(GAMES_URL);
    games = await response.json();
    renderGames();
    renderAdminGames();
  } catch (error) {
    console.error('Error fetching games:', error);
    gamesContainerEl.innerHTML = `
      <div class="text-center py-12 col-span-full">
        <p class="text-red-400">Erro ao carregar jogos. Tente novamente mais tarde.</p>
      </div>
    `;
  }
}

// Fetch cart from API
async function fetchCart() {
  try {
    const response = await fetch(CART_URL);
    cart = await response.json();
    updateCartCount();
  } catch (error) {
    console.error('Error fetching cart:', error);
  }
}

// Render games grid
function renderGames() {
  if (games.length === 0) {
    gamesContainerEl.innerHTML = `
      <div class="text-center py-12 col-span-full">
        <p>Nenhum jogo encontrado. Adicione jogos na seção de administração.</p>
      </div>
    `;
    return;
  }
  
  gamesContainerEl.innerHTML = games.map(game => `
    <div class="game-card group cursor-pointer bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700">
      <div class="relative h-48 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-t-lg flex items-center justify-center overflow-hidden">
        ${game.imagem 
          ? `<img src="${game.imagem}" alt="${game.nome}" class="w-full h-full object-cover">`
          : `<svg class="w-16 h-16 text-purple-400 opacity-50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12H18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 6V18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" stroke-width="2" />
             </svg>`
        }
        <div class="absolute top-2 right-2">
          <span class="bg-purple-600 text-white text-xs px-2 py-1 rounded-md">
            ${game.genero}
          </span>
        </div>
      </div>
      
      <div class="p-4">
        <h3 class="font-gaming text-lg text-white group-hover:glow-text transition-all duration-300 mb-2">
          ${game.nome}
        </h3>
        
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center space-x-1">
            <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            <span class="text-sm text-gray-300">${game.classificacao || 0}/10</span>
          </div>
          <span class="${game.quantidade > 0 ? 'text-green-400' : 'text-red-400'} text-sm">
            ${game.quantidade > 0 ? `${game.quantidade} em estoque` : 'Esgotado'}
          </span>
        </div>
        
        <div class="text-2xl font-bold glow-text mb-4">
          R$ ${game.preco.toFixed(2)}
        </div>
        
        <button 
          class="w-full bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center transition-all ${game.quantidade <= 0 ? 'opacity-50 cursor-not-allowed' : 'btn-gaming'}"
          onclick="addToCart(${game.codigo})"
          ${game.quantidade <= 0 ? 'disabled' : ''}
        >
          <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 20C9 21.1 8.1 22 7 22C5.9 22 5 21.1 5 20C5 18.9 5.9 18 7 18C8.1 18 9 18.9 9 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20 20C20 21.1 19.1 22 18 22C16.9 22 16 21.1 16 20C16 18.9 16.9 18 18 18C19.1 18 20 18.9 20 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2.05 2.05H4.05L6.715 14.47C6.81942 14.9147 7.06186 15.3129 7.41221 15.6115C7.76256 15.9101 8.2009 16.0973 8.655 16.05H18.555C19.0009 16.0973 19.4321 15.9101 19.7752 15.6115C20.1184 15.3129 20.3536 14.9147 20.45 14.47L22.1 7.05H5.455" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  `).join('');
}

// Render cart items
function renderCart() {
  if (cart.length === 0) {
    cartContainerEl.innerHTML = `
      <div class="text-center py-12">
        <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 20C9 21.1 8.1 22 7 22C5.9 22 5 21.1 5 20C5 18.9 5.9 18 7 18C8.1 18 9 18.9 9 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M20 20C20 21.1 19.1 22 18 22C16.9 22 16 21.1 16 20C16 18.9 16.9 18 18 18C19.1 18 20 18.9 20 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2.05 2.05H4.05L6.715 14.47C6.81942 14.9147 7.06186 15.3129 7.41221 15.6115C7.76256 15.9101 8.2009 16.0973 8.655 16.05H18.555C19.0009 16.0973 19.4321 15.9101 19.7752 15.6115C20.1184 15.3129 20.3536 14.9147 20.45 14.47L22.1 7.05H5.455" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <h3 class="text-xl font-semibold text-gray-400 mb-2">Carrinho Vazio</h3>
        <p class="text-gray-500 mb-6">Adicione alguns jogos incríveis ao seu carrinho!</p>
        <button onclick="navigateTo('games')()" class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md">
          Explorar Jogos
        </button>
      </div>
    `;
    return;
  }
  
  const total = cart.reduce((sum, item) => sum + (item.produto.preco * item.quantidade), 0);
  
  cartContainerEl.innerHTML = `
    <div class="space-y-4">
      ${cart.map(item => `
        <div class="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
          <div class="flex-1">
            <h4 class="font-semibold">${item.produto.nome}</h4>
            <p class="text-sm text-gray-300">${item.produto.genero}</p>
            <p class="text-lg font-bold glow-text">R$ ${item.produto.preco.toFixed(2)}</p>
          </div>
          
          <div class="flex items-center space-x-3">
            <div class="flex items-center space-x-2">
              <button
                class="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center"
                onclick="updateCartQuantity(${item.produto.codigo}, ${Math.max(1, item.quantidade - 1)})"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <span class="w-8 text-center font-semibold">${item.quantidade}</span>
              <button
                class="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center"
                onclick="updateCartQuantity(${item.produto.codigo}, ${item.quantidade + 1})"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            
            <button
              class="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center"
              onclick="removeFromCart(${item.produto.codigo})"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      `).join('')}
      
      <div class="border-t border-gray-700 pt-4">
        <div class="flex justify-between items-center mb-4">
          <span class="text-xl font-bold">Total:</span>
          <span class="text-2xl font-bold glow-text">R$ ${total.toFixed(2)}</span>
        </div>
        
        <button 
          onclick="navigateTo('checkout')()"
          class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-md btn-gaming text-lg"
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  `;
}

// Render checkout page
function renderCheckout() {
  if (cart.length === 0) {
    navigateTo('cart')();
    return;
  }
  
  const total = cart.reduce((sum, item) => sum + (item.produto.preco * item.quantidade), 0);
  
  checkoutItemsEl.innerHTML = cart.map(item => `
    <div class="flex justify-between items-center">
      <div>
        <p class="font-semibold">${item.produto.nome}</p>
        <p class="text-sm text-gray-400">Quantidade: ${item.quantidade}</p>
      </div>
      <p class="font-semibold">R$ ${(item.produto.preco * item.quantidade).toFixed(2)}</p>
    </div>
  `).join('');
  
  checkoutTotalEl.innerText = `R$ ${total.toFixed(2)}`;
  
  // Reset payment form
  document.querySelectorAll('input[name="payment"]').forEach(input => {
    input.checked = false;
  });
  
  installmentsContainerEl.classList.add('hidden');
  installmentsEl.value = '1';
  
  // Update installments options with calculated values
  installmentsEl.innerHTML = `
    <option value="1">1x de R$ ${total.toFixed(2)}</option>
    <option value="2">2x de R$ ${(total / 2).toFixed(2)}</option>
    <option value="3">3x de R$ ${(total / 3).toFixed(2)}</option>
  `;
  
  updateConfirmButtonState();
}

// Render admin games table
function renderAdminGames() {
  if (games.length === 0) {
    adminGamesTableEl.innerHTML = `
      <tr>
        <td colspan="7" class="p-3 text-center">Nenhum jogo cadastrado.</td>
      </tr>
    `;
    return;
  }
  
  adminGamesTableEl.innerHTML = games.map(game => `
    <tr>
      <td class="p-3">${game.codigo}</td>
      <td class="p-3">${game.nome}</td>
      <td class="p-3">${game.genero}</td>
      <td class="p-3">R$ ${game.preco.toFixed(2)}</td>
      <td class="p-3">${game.quantidade}</td>
      <td class="p-3">${game.classificacao || 'N/A'}</td>
      <td class="p-3">
        <button
          class="text-red-400 hover:text-red-300"
          onclick="deleteGame(${game.codigo})"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </td>
    </tr>
  `).join('');
}

// Add to cart
async function addToCart(gameId) {
  try {
    const response = await fetch(CART_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameId })
    });
    
    cart = await response.json();
    updateCartCount();
    showModal('Jogo Adicionado', 'Jogo adicionado ao carrinho com sucesso!');
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
}

// Update cart item quantity
async function updateCartQuantity(gameId, quantity) {
  try {
    const response = await fetch(`${CART_URL}/${gameId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity })
    });
    
    cart = await response.json();
    updateCartCount();
    renderCart();
  } catch (error) {
    console.error('Error updating cart:', error);
  }
}

// Remove from cart
async function removeFromCart(gameId) {
  try {
    const response = await fetch(`${CART_URL}/${gameId}`, {
      method: 'DELETE'
    });
    
    cart = await response.json();
    updateCartCount();
    renderCart();
  } catch (error) {
    console.error('Error removing from cart:', error);
  }
}

// Update cart count badge
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantidade, 0);
  cartCountEl.textContent = count;
  
  if (count > 0) {
    cartCountEl.classList.remove('hidden');
  } else {
    cartCountEl.classList.add('hidden');
  }
}

// Handle game form submission
async function handleGameFormSubmit(e) {
  e.preventDefault();
  
  const gameData = {
    codigo: Date.now() + Math.floor(Math.random() * 1000), // Generate unique code
    nome: document.getElementById('nome').value,
    genero: document.getElementById('genero').value,
    preco: parseFloat(document.getElementById('preco').value),
    quantidade: parseInt(document.getElementById('quantidade').value) || 1,
    classificacao: parseInt(document.getElementById('classificacao').value) || 8,
    imagem: document.getElementById('imagem').value || null,
    disponibilidade: 'Disponível'
  };
  
  try {
    const response = await fetch(GAMES_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gameData)
    });
    
    const newGame = await response.json();
    games.push(newGame);
    
    renderGames();
    renderAdminGames();
    
    // Reset form
    gameFormEl.reset();
    
    showModal('Jogo Cadastrado', 'Jogo cadastrado com sucesso!');
  } catch (error) {
    console.error('Error adding game:', error);
    showModal('Erro', 'Erro ao cadastrar jogo. Tente novamente.', 'error');
  }
}

// Handle checkout
async function handleCheckout() {
  const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;
  if (!paymentMethod) return;
  
  const installments = paymentMethod === 'credit' 
    ? document.getElementById('installments').value 
    : '1';
  
  try {
    // Show processing state
    confirmPaymentEl.disabled = true;
    confirmPaymentEl.innerHTML = `
      <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
      Processando...
    `;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const response = await fetch(CHECKOUT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentMethod,
        installments: parseInt(installments)
      })
    });
    
    const result = await response.json();
    
    // Reset confirmation button
    confirmPaymentEl.disabled = false;
    confirmPaymentEl.textContent = 'Confirmar Pagamento';
    
    // Show success message based on payment method
    let message = '';
    const total = cart.reduce((sum, item) => sum + (item.produto.preco * item.quantidade), 0);
    
    switch (paymentMethod) {
      case 'credit':
        const installmentValue = total / parseInt(installments);
        message = installments === '1' 
          ? `Pagamento de R$ ${total.toFixed(2)} processado com sucesso!`
          : `Pagamento parcelado em ${installments}x de R$ ${installmentValue.toFixed(2)} processado com sucesso!`;
        break;
      case 'debit':
        message = `Pagamento de R$ ${total.toFixed(2)} via débito processado com sucesso!`;
        break;
      case 'pix':
        message = `PIX de R$ ${total.toFixed(2)} processado com sucesso! Chave PIX: 005.148.965-85`;
        break;
    }
    
    showModal('Pedido Realizado', message);
    
    // Update cart and navigate to games
    cart = [];
    updateCartCount();
    navigateTo('games')();
  } catch (error) {
    console.error('Error during checkout:', error);
    
    // Reset confirmation button
    confirmPaymentEl.disabled = false;
    confirmPaymentEl.textContent = 'Confirmar Pagamento';
    
    showModal('Erro', 'Erro no processamento do pagamento. Tente novamente.', 'error');
  }
}

// Delete game (admin function)
async function deleteGame(gameId) {
  if (!confirm('Tem certeza que deseja excluir este jogo?')) return;
  
  // In a real app, use API to delete
  // Since we don't have that endpoint, just update the array
  const index = games.findIndex(game => game.codigo === gameId);
  if (index !== -1) {
    games.splice(index, 1);
    renderGames();
    renderAdminGames();
    
    showModal('Jogo Excluído', 'Jogo excluído com sucesso!');
  }
}

// Update confirm payment button state
function updateConfirmButtonState() {
  const paymentSelected = document.querySelector('input[name="payment"]:checked') !== null;
  confirmPaymentEl.disabled = !paymentSelected;
}

// Show modal with message
function showModal(title, message, type = 'success') {
  modalTitleEl.textContent = title;
  modalMessageEl.textContent = message;
  successModalEl.classList.remove('hidden');
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    successModalEl.classList.add('hidden');
  }, 3000);
}

// Make functions available globally
window.addToCart = addToCart;
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;
window.navigateTo = navigateTo;
window.deleteGame = deleteGame;
