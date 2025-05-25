
import React, { useState } from 'react';
import { CreditCard, Banknote, Smartphone, ArrowLeft } from 'lucide-react';
import { CartItem, PaymentOption } from '../types/Game';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CheckoutProps {
  cartItems: CartItem[];
  onBack: () => void;
  onPaymentComplete: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, onBack, onPaymentComplete }) => {
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [installments, setInstallments] = useState<string>('1');
  const [isProcessing, setIsProcessing] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + (item.produto.preco * item.quantidade), 0);

  const paymentOptions: PaymentOption[] = [
    { id: 'credit', name: 'Cartão de Crédito', icon: 'CreditCard', description: 'Parcelamento em até 3x sem juros' },
    { id: 'debit', name: 'Cartão de Débito', icon: 'CreditCard', description: 'Pagamento à vista' },
    { id: 'pix', name: 'PIX', icon: 'Smartphone', description: 'Pagamento instantâneo' }
  ];

  const handlePayment = async () => {
    if (!selectedPayment) return;

    setIsProcessing(true);
    
    // Simula processamento do pagamento
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    let paymentMessage = '';
    
    switch (selectedPayment) {
      case 'credit':
        const installmentValue = total / parseInt(installments);
        paymentMessage = installments === '1' 
          ? `Pagamento de R$ ${total.toFixed(2)} processado com sucesso!`
          : `Pagamento parcelado em ${installments}x de R$ ${installmentValue.toFixed(2)} processado com sucesso!`;
        break;
      case 'debit':
        paymentMessage = `Pagamento de R$ ${total.toFixed(2)} via débito processado com sucesso!`;
        break;
      case 'pix':
        paymentMessage = `PIX de R$ ${total.toFixed(2)} processado com sucesso!\nChave PIX: 005.148.965-85`;
        break;
    }
    
    alert(paymentMessage);
    setIsProcessing(false);
    onPaymentComplete();
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao Carrinho
        </Button>
        <h2 className="text-2xl font-bold font-gaming glow-text">Finalizar Pedido</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Resumo do Pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.produto.codigo} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.produto.nome}</p>
                  <p className="text-sm text-gray-600">Quantidade: {item.quantidade}</p>
                </div>
                <p className="font-semibold">R$ {(item.produto.preco * item.quantidade).toFixed(2)}</p>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total:</span>
                <span className="glow-text">R$ {total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Forma de Pagamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
              {paymentOptions.map((option) => (
                <div key={option.id} className="payment-option">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <div className="flex-1">
                      <Label htmlFor={option.id} className="flex items-center space-x-3 cursor-pointer">
                        {option.icon === 'CreditCard' && <CreditCard className="w-5 h-5" />}
                        {option.icon === 'Smartphone' && <Smartphone className="w-5 h-5" />}
                        <div>
                          <p className="font-semibold">{option.name}</p>
                          <p className="text-sm text-gray-600">{option.description}</p>
                        </div>
                      </Label>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>

            {selectedPayment === 'credit' && (
              <div className="space-y-2">
                <Label htmlFor="installments">Parcelamento</Label>
                <Select value={installments} onValueChange={setInstallments}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha o parcelamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1x de R$ {total.toFixed(2)}</SelectItem>
                    <SelectItem value="2">2x de R$ {(total / 2).toFixed(2)}</SelectItem>
                    <SelectItem value="3">3x de R$ {(total / 3).toFixed(2)}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button 
              onClick={handlePayment} 
              disabled={!selectedPayment || isProcessing}
              className="w-full btn-gaming text-lg py-3"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processando...
                </>
              ) : (
                'Confirmar Pagamento'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
