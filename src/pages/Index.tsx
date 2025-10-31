import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedCheat, setSelectedCheat] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{text: string, isUser: boolean}>>([
    { text: 'Здравствуйте! Чем могу помочь?', isUser: false }
  ]);
  const [messageInput, setMessageInput] = useState('');

  const sendMessage = () => {
    if (messageInput.trim()) {
      setChatMessages([...chatMessages, { text: messageInput, isUser: true }]);
      setMessageInput('');
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          text: 'Спасибо за сообщение! Наш оператор ответит в ближайшее время. По срочным вопросам пишите @Zirys',
          isUser: false
        }]);
      }, 1500);
    }
  };

  const cheats = [
    {
      id: 1,
      name: 'LebroDLC 1D',
      description: 'Подписка на 1 день',
      period: '1 день',
      price: '100₽',
      features: ['ESP', 'Aim bot', 'Aimkill', 'Magic bullet', 'Нет отдачи', 'Fast reload', 'Kick', 'Бессмертные инструменты', 'Auto farm'],
      popular: false,
    },
    {
      id: 2,
      name: 'LebroDLC 7D',
      description: 'Подписка на 7 дней',
      period: '7 дней',
      price: '320₽',
      features: ['ESP', 'Aim bot', 'Aimkill', 'Magic bullet', 'Нет отдачи', 'Fast reload', 'Kick', 'Бессмертные инструменты', 'Auto farm'],
      popular: true,
      discount: 'Выгодно',
    },
    {
      id: 3,
      name: 'LebroDLC 30D',
      description: 'Подписка на 30 дней',
      period: '30 дней',
      price: '800₽',
      features: ['ESP', 'Aim bot', 'Aimkill', 'Magic bullet', 'Нет отдачи', 'Fast reload', 'Kick', 'Бессмертные инструменты', 'Auto farm'],
      popular: true,
      discount: 'Хит продаж',
    },
  ];

  const faqItems = [
    {
      question: 'Как происходит доставка чита?',
      answer: 'После оплаты вы мгновенно получаете ссылку на скачивание и инструкцию по установке в Telegram.',
    },
    {
      question: 'Есть ли гарантия работы?',
      answer: 'Да! Мы гарантируем работоспособность всех читов. Если возникнут проблемы — возврат средств в течение 24 часов.',
    },
    {
      question: 'Безопасно ли использовать читы?',
      answer: 'Мы используем современные методы защиты от античитов, но 100% безопасности никто не может гарантировать.',
    },
    {
      question: 'Какие способы оплаты доступны?',
      answer: 'Принимаем карты РФ, криптовалюту, QIWI, ЮMoney и другие популярные методы оплаты.',
    },
    {
      question: 'Как связаться с поддержкой?',
      answer: 'Откройте чат поддержки на сайте или напишите создателю в Telegram: @Zirys. Отвечаем быстро!',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon name="Shield" className="text-primary" size={32} />
            <h1 className="text-2xl font-bold text-primary">LebroDLC</h1>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="gap-2">
                <Icon name="MessageCircle" size={18} />
                Поддержка
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Icon name="Headphones" className="text-primary" />
                  Техподдержка
                </SheetTitle>
                <SheetDescription>
                  Задайте вопрос нашим специалистам
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col h-[calc(100vh-180px)] mt-4">
                <ScrollArea className="flex-1 pr-4 mb-4">
                  <div className="space-y-4">
                    {chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                            msg.isUser
                              ? 'bg-primary text-primary-foreground rounded-br-sm'
                              : 'bg-muted text-foreground rounded-bl-sm'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="flex gap-2 border-t pt-4">
                  <Input
                    placeholder="Введите сообщение..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} size="icon">
                    <Icon name="Send" size={18} />
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="relative overflow-hidden py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 pointer-events-none" />
        <div className="container mx-auto text-center relative z-10 max-w-5xl">
          <Badge className="mb-4 bg-secondary text-secondary-foreground hover:bg-secondary/90 text-sm px-4 py-1">
            🔥 Лучшие читы 2024
          </Badge>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
            ПРЕМИУМ ЧИТЫ
            <br />
            <span className="text-primary">LebroDLC</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Надежные читы для Oxide Survival Island. Моментальная доставка. Гарантия возврата средств.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="gap-2 text-lg px-8">
              <Icon name="ShoppingCart" size={20} />
              Купить чит
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
              <Icon name="Shield" size={20} />
              Гарантии
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Тарифы LebroDLC</h3>
            <p className="text-muted-foreground text-lg">Выберите подходящий период подписки</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {cheats.map((cheat) => (
              <Card
                key={cheat.id}
                className={`p-8 hover:border-primary transition-all duration-300 cursor-pointer hover:scale-105 ${
                  selectedCheat === cheat.name ? 'border-primary shadow-xl shadow-primary/30 scale-105' : ''
                } ${cheat.popular ? 'border-primary/50' : ''}`}
                onClick={() => setSelectedCheat(cheat.name)}
              >
                {cheat.discount && (
                  <Badge className="mb-4 bg-secondary text-secondary-foreground">
                    {cheat.discount}
                  </Badge>
                )}
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold mb-2">{cheat.name}</h4>
                  <p className="text-muted-foreground">{cheat.period}</p>
                </div>
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-primary mb-2">{cheat.price}</div>
                </div>
                <div className="mb-6 space-y-3">
                  <p className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">Функции:</p>
                  {cheat.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Icon name="Check" size={18} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full gap-2 h-12 text-base">
                  <Icon name="ShoppingBag" size={18} />
                  Купить
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Icon name="ShieldCheck" size={56} className="text-primary mx-auto mb-4" />
            <h3 className="text-4xl font-bold mb-4">Наши гарантии</h3>
            <p className="text-muted-foreground text-lg">Мы ценим каждого клиента</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="CheckCircle" size={36} className="text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-3">100% Доставка</h4>
              <p className="text-muted-foreground leading-relaxed">
                Гарантируем получение чита сразу после оплаты. Если возникнут проблемы — вернем деньги.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="RotateCcw" size={36} className="text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Возврат средств</h4>
              <p className="text-muted-foreground leading-relaxed">
                Если чит не работает или возникла ошибка — вернем полную стоимость в течение 24 часов.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Headphones" size={36} className="text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-3">24/7 Поддержка</h4>
              <p className="text-muted-foreground leading-relaxed">
                Наша команда всегда на связи. Поможем с установкой и настройкой в любое время.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Icon name="HelpCircle" size={56} className="text-primary mx-auto mb-4" />
            <h3 className="text-4xl font-bold mb-4">Частые вопросы</h3>
            <p className="text-muted-foreground text-lg">Ответы на популярные вопросы</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="bg-background border rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline py-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Icon name="Shield" className="text-primary" size={36} />
            <h2 className="text-3xl font-bold text-primary">LebroDLC</h2>
          </div>
          <p className="text-muted-foreground mb-8 text-lg">Премиум читы для Oxide Survival Island</p>
          <div className="flex gap-4 justify-center mb-8">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Icon name="MessageCircle" size={18} />
                  Открыть чат
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Icon name="Headphones" className="text-primary" />
                    Техподдержка
                  </SheetTitle>
                  <SheetDescription>
                    Задайте вопрос нашим специалистам
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col h-[calc(100vh-180px)] mt-4">
                  <ScrollArea className="flex-1 pr-4 mb-4">
                    <div className="space-y-4">
                      {chatMessages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                              msg.isUser
                                ? 'bg-primary text-primary-foreground rounded-br-sm'
                                : 'bg-muted text-foreground rounded-bl-sm'
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="flex gap-2 border-t pt-4">
                    <Input
                      placeholder="Введите сообщение..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={sendMessage} size="icon">
                      <Icon name="Send" size={18} />
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <a href="https://t.me/Zirys" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2">
                <Icon name="Send" size={18} />
                Telegram
              </Button>
            </a>
          </div>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>Создатель сайта: <a href="https://t.me/Zirys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">@Zirys</a></p>
            <p>© 2024 LebroDLC. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
