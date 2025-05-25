
import React from 'react';
import { ShoppingCart, Star, GamepadIcon } from 'lucide-react';
import { Game } from '../types/Game';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GameCardProps {
  game: Game;
  onAddToCart: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart(game);
  };

  return (
    <Card className="game-card group cursor-pointer">
      <CardHeader className="pb-2">
        <div className="relative h-48 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          {game.imagem ? (
            <img 
              src={game.imagem} 
              alt={game.nome} 
              className="w-full h-full object-cover"
            />
          ) : (
            <GamepadIcon className="w-16 h-16 text-purple-400 opacity-50" />
          )}
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-purple-600 text-white">
              {game.genero}
            </Badge>
          </div>
        </div>
        <CardTitle className="font-gaming text-lg text-white group-hover:glow-text transition-all duration-300">
          {game.nome}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-300">{game.classificacao}/10</span>
          </div>
          <Badge variant={game.quantidade > 0 ? "default" : "destructive"}>
            {game.quantidade > 0 ? `${game.quantidade} em estoque` : "Esgotado"}
          </Badge>
        </div>
        
        <div className="text-2xl font-bold glow-text">
          R$ {game.preco.toFixed(2)}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleAddToCart} 
          disabled={game.quantidade <= 0}
          className="w-full btn-gaming"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GameCard;
