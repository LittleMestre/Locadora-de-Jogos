
import React from 'react';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { CartItem } from '../types/Game';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (codigo: number, novaQuantidade: number) => void;
  onRemoveItem: (codigo: number) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout 
}) => {
  const total = cartItems.reduce((sum, item) => sum + (item.produto.preco * item.quantidade), 0);

  if (cartItems.length === 0) {
    return (
      <Card className="animate-fade-in">
        <CardContent className="py-12 text-center">
          <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Carrinho Vazio</h3>
          <p className="text-gray-500">Adicione alguns jogos incríveis ao seu carrinho!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ShoppingCart className="w-6 h-6" />
          <span>Seu Carrinho ({cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'})</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.produto.codigo} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <h4 className="font-semibold">{item.produto.nome}</h4>
              <p className="text-sm text-gray-600">{item.produto.genero}</p>
              <p className="text-lg font-bold glow-text">R$ {item.produto.preco.toFixed(2)}</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onUpdateQuantity(item.produto.codigo, Math.max(1, item.quantidade - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center font-semibold">{item.quantidade}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onUpdateQuantity(item.produto.codigo, item.quantidade + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onRemoveItem(item.produto.codigo)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
        
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-2xl font-bold glow-text">R$ {total.toFixed(2)}</span>
          </div>
          
          <Button 
            onClick={onCheckout} 
            className="w-full btn-gaming text-lg py-3"
          >
            Finalizar Pedido
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Cart;
