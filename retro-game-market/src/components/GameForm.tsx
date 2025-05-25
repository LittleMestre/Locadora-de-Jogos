
import React, { useState } from 'react';
import { Plus, GamepadIcon } from 'lucide-react';
import { Game } from '../types/Game';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GameFormProps {
  onAddGame: (game: Game) => void;
  onClose: () => void;
}

const GameForm: React.FC<GameFormProps> = ({ onAddGame, onClose }) => {
  const [formData, setFormData] = useState({
    codigo: Date.now(), // Auto-generate code
    nome: '',
    genero: '',
    classificacao: 8,
    preco: 0,
    quantidade: 1,
    disponibilidade: 'Disponível',
    imagem: '',
    descricao: ''
  });

  const generos = [
    'Ação', 'Aventura', 'RPG', 'Estratégia', 'Esportes', 
    'Corrida', 'Simulação', 'Puzzle', 'Terror', 'Indie'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.genero || formData.preco <= 0) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    const newGame: Game = {
      ...formData,
      codigo: Date.now() + Math.random() // Ensure unique code
    };

    onAddGame(newGame);
    onClose();
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="animate-scale-in">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <GamepadIcon className="w-6 h-6" />
          <span>Cadastrar Novo Jogo</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nome">Nome do Jogo *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => handleChange('nome', e.target.value)}
                placeholder="Ex: The Legend of Zelda"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="genero">Gênero *</Label>
              <Select value={formData.genero} onValueChange={(value) => handleChange('genero', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o gênero" />
                </SelectTrigger>
                <SelectContent>
                  {generos.map((genero) => (
                    <SelectItem key={genero} value={genero}>{genero}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="preco">Preço (R$) *</Label>
              <Input
                id="preco"
                type="number"
                step="0.01"
                min="0"
                value={formData.preco}
                onChange={(e) => handleChange('preco', parseFloat(e.target.value) || 0)}
                placeholder="59.99"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="quantidade">Estoque</Label>
              <Input
                id="quantidade"
                type="number"
                min="0"
                value={formData.quantidade}
                onChange={(e) => handleChange('quantidade', parseInt(e.target.value) || 0)}
              />
            </div>
            
            <div>
              <Label htmlFor="classificacao">Nota (1-10)</Label>
              <Input
                id="classificacao"
                type="number"
                min="1"
                max="10"
                value={formData.classificacao}
                onChange={(e) => handleChange('classificacao', parseInt(e.target.value) || 8)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="imagem">URL da Imagem</Label>
            <Input
              id="imagem"
              value={formData.imagem}
              onChange={(e) => handleChange('imagem', e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>

          <div className="flex space-x-3">
            <Button type="submit" className="flex-1 btn-gaming">
              <Plus className="w-4 h-4 mr-2" />
              Cadastrar Jogo
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default GameForm;
