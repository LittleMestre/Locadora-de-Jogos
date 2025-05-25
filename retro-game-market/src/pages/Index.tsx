
import React, { useState } from 'react';
import { ShoppingCart, Plus, Store, GamepadIcon, Users, Star } from 'lucide-react';
import { Game, CartItem } from '../types/Game';
import GameCard from '../components/GameCard';
import Cart from '../components/Cart';
import Checkout from '../components/Checkout';
import GameForm from '../components/GameForm';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [games, setGames] = useState<Game[]>([
    {
      codigo: 1,
      nome: "Cyberpunk 2077",
      genero: "RPG",
      classificacao: 9,
      disponibilidade: "Disponível",
      preco: 199.99,
      quantidade: 15,
      imagem: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400",
      descricao: "Um RPG futurístico em mundo aberto"
    },
    {
      codigo: 2,
      nome: "The Witcher 3",
      genero: "RPG",
      classificacao: 10,
      disponibilidade: "Disponível",
      preco: 89.99,
      quantidade: 8,
      imagem: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400",
      descricao: "Uma épica aventura medieval"
    },
    {
      codigo: 3,
      nome: "FIFA 24",
      genero: "Esportes",
      classificacao: 8,
      disponibilidade: "Disponível",
      preco: 299.99,
      quantidade: 20,
      imagem: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400",
      descricao: "O melhor jogo de futebol do ano"
    }
  ]);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentView, setCurrentView] = useState<'catalog' | 'cart' | 'checkout'>('catalog');
  const [showGameForm, setShowGameForm] = useState(false);
  const { toast } = useToast();

  const addToCart = (game: Game) => {
    const existingItem = cartItems.find(item => item.produto.codigo === game.codigo);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.produto.codigo === game.codigo
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      ));
      toast({
        title: "Quantidade atualizada!",
        description: `${game.nome} foi adicionado ao carrinho`,
      });
    } else {
      setCartItems([...cartItems, { produto: game, quantidade: 1 }]);
      toast({
        title: "Adicionado ao carrinho!",
        description: `${game.nome} foi adicionado ao carrinho`,
      });
    }
  };

  const updateQuantity = (codigo: number, novaQuantidade: number) => {
    setCartItems(cartItems.map(item =>
      item.produto.codigo === codigo
        ? { ...item, quantidade: novaQuantidade }
        : item
    ));
  };

  const removeFromCart = (codigo: number) => {
    const item = cartItems.find(item => item.produto.codigo === codigo);
    setCartItems(cartItems.filter(item => item.produto.codigo !== codigo));
    
    if (item) {
      toast({
        title: "Item removido",
        description: `${item.produto.nome} foi removido do carrinho`,
      });
    }
  };

  const addGame = (newGame: Game) => {
    setGames([...games, newGame]);
    toast({
      title: "Jogo cadastrado!",
      description: `${newGame.nome} foi adicionado ao catálogo`,
    });
  };

  const handlePaymentComplete = () => {
    setCartItems([]);
    setCurrentView('catalog');
    toast({
      title: "Pedido finalizado!",
      description: "Obrigado por comprar conosco! Volte sempre!",
    });
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantidade, 0);
  const totalGames = games.length;
  const totalInStock = games.reduce((sum, game) => sum + game.quantidade, 0);
  const averageRating = games.reduce((sum, game) => sum + game.classificacao, 0) / games.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-purple-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg animate-glow">
                <GamepadIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-gaming glow-text">GameStore</h1>
                <p className="text-sm text-gray-400">Sua loja de jogos favorita</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowGameForm(true)}
                className="hidden md:flex"
              >
                <Plus className="w-4 h-4 mr-2" />
                Cadastrar Jogo
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setCurrentView('cart')}
                className="relative"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Carrinho
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20">
            <div className="flex items-center space-x-3">
              <Store className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-white">{totalGames}</p>
                <p className="text-gray-400">Jogos no Catálogo</p>
              </div>
            </div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">{totalInStock}</p>
                <p className="text-gray-400">Itens em Estoque</p>
              </div>
            </div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20">
            <div className="flex items-center space-x-3">
              <Star className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-white">{averageRating.toFixed(1)}</p>
                <p className="text-gray-400">Nota Média</p>
              </div>
            </div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">{totalItems}</p>
                <p className="text-gray-400">Itens no Carrinho</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {showGameForm && (
            <GameForm
              onAddGame={addGame}
              onClose={() => setShowGameForm(false)}
            />
          )}

          {currentView === 'catalog' && (
            <Tabs defaultValue="catalog" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="catalog">Catálogo de Jogos</TabsTrigger>
                <TabsTrigger value="add-game" onClick={() => setShowGameForm(true)}>
                  Cadastrar Jogo
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="catalog">
                {games.length === 0 ? (
                  <div className="text-center py-12">
                    <GamepadIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-300 mb-2">Nenhum jogo cadastrado</h3>
                    <p className="text-gray-500 mb-4">Cadastre alguns jogos para começar!</p>
                    <Button onClick={() => setShowGameForm(true)} className="btn-gaming">
                      <Plus className="w-4 h-4 mr-2" />
                      Cadastrar Primeiro Jogo
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {games.map((game) => (
                      <GameCard
                        key={game.codigo}
                        game={game}
                        onAddToCart={addToCart}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}

          {currentView === 'cart' && (
            <Cart
              cartItems={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
              onCheckout={() => setCurrentView('checkout')}
            />
          )}

          {currentView === 'checkout' && (
            <Checkout
              cartItems={cartItems}
              onBack={() => setCurrentView('cart')}
              onPaymentComplete={handlePaymentComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
