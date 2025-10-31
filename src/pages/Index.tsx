import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedCheat, setSelectedCheat] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{text: string, isUser: boolean}>>([
    { text: 'Привет! Я AI-ассистент LebroDLC. Чем могу помочь? 🎮', isUser: false }
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const getAIResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('цена') || msg.includes('стоимость') || msg.includes('сколько')) {
      return 'У нас 3 тарифа:\n• 1 день - 100₽\n• 7 дней - 320₽\n• 30 дней - 800₽\n\nВсе тарифы включают полный функционал! 🔥';
    }
    if (msg.includes('функци') || msg.includes('возможности') || msg.includes('что умеет')) {
      return 'LebroDLC включает:\n✅ ESP\n✅ Aim bot\n✅ Aimkill\n✅ Magic bullet\n✅ Нет отдачи\n✅ Fast reload\n✅ Kick\n✅ Бессмертные инструменты\n✅ Auto farm';
    }
    if (msg.includes('оплат') || msg.includes('купить') || msg.includes('заказать')) {
      return 'Оплата через СБП на номер:\n+7 918 726-50-53\n\nПосле оплаты пришлите чек в поддержку @Zirys для активации! 💳';
    }
    if (msg.includes('доставка') || msg.includes('получить') || msg.includes('скачать')) {
      return 'После оплаты вы сразу получаете:\n📥 Ссылку на скачивание\n📝 Инструкцию по установке\n🔑 Ключ активации\n\nВсё в Telegram!';
    }
    if (msg.includes('гарантия') || msg.includes('возврат') || msg.includes('не работает')) {
      return 'Даём 100% гарантию!\n✅ Возврат денег в течение 24 часов\n✅ Поддержка при установке\n✅ Обновления бесплатно';
    }
    if (msg.includes('безопасн') || msg.includes('бан') || msg.includes('обнаруж')) {
      return 'Используем современные методы защиты от античитов. Но помните - 100% гарантии безопасности никто не даст. Используйте на свой риск! ⚠️';
    }
    if (msg.includes('как установить') || msg.includes('установка') || msg.includes('настройка')) {
      return 'После покупки вы получите подробную инструкцию! Если что-то непонятно - наша поддержка поможет с установкой 24/7! 🛠';
    }
    if (msg.includes('поддержка') || msg.includes('помощь') || msg.includes('оператор')) {
      return 'Для связи с живой поддержкой напишите:\n📱 Telegram: @Zirys\n\nОтветим в течение часа! 🚀';
    }
    
    return 'Извините, не совсем понял ваш вопрос 😅\n\nДля подробной консультации свяжитесь с нашей поддержкой:\n📱 @Zirys в Telegram\n\nОператор ответит быстро!';
  };

  const sendMessage = () => {
    if (messageInput.trim()) {
      const userMsg = messageInput;
      setChatMessages([...chatMessages, { text: userMsg, isUser: true }]);
      setMessageInput('');
      
      setTimeout(() => {
        const aiResponse = getAIResponse(userMsg);
        setChatMessages(prev => [...prev, {
          text: aiResponse,
          isUser: false
        }]);
      }, 800);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
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
      answer: 'Принимаем оплату через СБП (Систему Быстрых Платежей) на номер +7 918 726-50-53.',
    },
    {
      question: 'Как связаться с поддержкой?',
      answer: 'Откройте AI-чат поддержки на сайте или напишите создателю в Telegram: @Zirys. Отвечаем быстро!',
    },
  ];

  const ChatSupport = () => (
    <div className="flex flex-col h-[calc(100vh-180px)] mt-4">
      <ScrollArea className="flex-1 pr-4 mb-4">
        <div className="space-y-4">
          {chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 whitespace-pre-line ${
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
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/98 backdrop-blur-md z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Icon name="Shield" className="text-primary" size={36} />
              <h1 className="text-2xl md:text-3xl font-bold text-primary">LebroDLC</h1>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection('products')} className="text-foreground hover:text-primary transition-colors font-medium">
                Тарифы
              </button>
              <button onClick={() => scrollToSection('features')} className="text-foreground hover:text-primary transition-colors font-medium">
                Возможности
              </button>
              <button onClick={() => scrollToSection('guarantees')} className="text-foreground hover:text-primary transition-colors font-medium">
                Гарантии
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-foreground hover:text-primary transition-colors font-medium">
                FAQ
              </button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="gap-2">
                    <Icon name="Bot" size={18} />
                    AI Поддержка
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <Icon name="Bot" className="text-primary" />
                      AI Поддержка
                    </SheetTitle>
                    <SheetDescription>
                      Умный ассистент ответит на ваши вопросы
                    </SheetDescription>
                  </SheetHeader>
                  <ChatSupport />
                </SheetContent>
              </Sheet>
            </nav>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Меню</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  <Button variant="ghost" onClick={() => scrollToSection('products')} className="justify-start text-lg">
                    Тарифы
                  </Button>
                  <Button variant="ghost" onClick={() => scrollToSection('features')} className="justify-start text-lg">
                    Возможности
                  </Button>
                  <Button variant="ghost" onClick={() => scrollToSection('guarantees')} className="justify-start text-lg">
                    Гарантии
                  </Button>
                  <Button variant="ghost" onClick={() => scrollToSection('faq')} className="justify-start text-lg">
                    FAQ
                  </Button>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button className="gap-2 text-lg">
                        <Icon name="Bot" size={18} />
                        AI Поддержка
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="w-[400px] sm:w-[540px]">
                      <SheetHeader>
                        <SheetTitle className="flex items-center gap-2">
                          <Icon name="Bot" className="text-primary" />
                          AI Поддержка
                        </SheetTitle>
                        <SheetDescription>
                          Умный ассистент ответит на ваши вопросы
                        </SheetDescription>
                      </SheetHeader>
                      <ChatSupport />
                    </SheetContent>
                  </Sheet>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden py-24 px-4 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.08),transparent_50%)]" />
        <div className="container mx-auto text-center relative z-10 max-w-6xl">
          <Badge className="mb-6 bg-secondary text-secondary-foreground hover:bg-secondary/90 text-sm px-6 py-2">
            🔥 Лучшие читы 2025
          </Badge>
          <h2 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight leading-tight">
            <span className="text-primary">LebroDLC</span>
            <br />
            ЧИТЫ ДЛЯ OXIDE
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Премиум читы для Oxide Survival Island с полным функционалом. Моментальная активация. Гарантия возврата.
          </p>
          <div className="flex gap-4 justify-center flex-wrap mb-12">
            <Button size="lg" className="gap-2 text-lg px-10 h-14" onClick={() => scrollToSection('products')}>
              <Icon name="ShoppingCart" size={22} />
              Купить чит
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button size="lg" variant="outline" className="gap-2 text-lg px-10 h-14">
                  <Icon name="Bot" size={22} />
                  Задать вопрос
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Icon name="Bot" className="text-primary" />
                    AI Поддержка
                  </SheetTitle>
                  <SheetDescription>
                    Умный ассистент ответит на ваши вопросы
                  </SheetDescription>
                </SheetHeader>
                <ChatSupport />
              </SheetContent>
            </Sheet>
          </div>

          <div className="max-w-4xl mx-auto">
            <img 
              src="https://cdn.poehali.dev/files/a41a5ab1-396f-44f3-ad75-2ce448574967.jpg" 
              alt="LebroDLC в действии" 
              className="rounded-2xl shadow-2xl border-2 border-primary/20 w-full hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Полный функционал</Badge>
            <h3 className="text-4xl md:text-5xl font-bold mb-4">Возможности читов</h3>
            <p className="text-muted-foreground text-lg">Все инструменты для доминирования в игре</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {['ESP', 'Aim bot', 'Aimkill', 'Magic bullet', 'Нет отдачи', 'Fast reload', 'Kick', 'Бессмертные инструменты', 'Auto farm'].map((feature, idx) => (
              <Card key={idx} className="p-6 text-center hover:border-primary transition-all hover:scale-105 cursor-pointer">
                <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Check" size={28} className="text-primary" />
                </div>
                <h4 className="font-semibold text-lg">{feature}</h4>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">Выгодные тарифы</Badge>
            <h3 className="text-4xl md:text-5xl font-bold mb-4">Тарифы LebroDLC</h3>
            <p className="text-muted-foreground text-lg">Выберите подходящий период подписки</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {cheats.map((cheat) => (
              <Card
                key={cheat.id}
                className={`p-8 hover:border-primary transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl ${
                  selectedCheat === cheat.name ? 'border-primary shadow-2xl shadow-primary/30 scale-105' : ''
                } ${cheat.popular ? 'border-primary/50 shadow-lg' : ''}`}
                onClick={() => setSelectedCheat(cheat.name)}
              >
                {cheat.discount && (
                  <Badge className="mb-4 bg-secondary text-secondary-foreground">
                    {cheat.discount}
                  </Badge>
                )}
                <div className="text-center mb-6">
                  <h4 className="text-3xl font-bold mb-2">{cheat.name}</h4>
                  <p className="text-muted-foreground text-lg">{cheat.period}</p>
                </div>
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold text-primary mb-2">{cheat.price}</div>
                </div>
                <div className="mb-8 space-y-3">
                  <p className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-4">Все функции включены:</p>
                  {cheat.features.slice(0, 5).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Icon name="Check" size={18} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  <p className="text-xs text-muted-foreground pt-2">+ еще {cheat.features.length - 5} функций</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full gap-2 h-12 text-base"
                      onClick={() => setSelectedProduct(cheat)}
                    >
                      <Icon name="ShoppingBag" size={18} />
                      Купить
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">Оплата {cheat.name}</DialogTitle>
                      <DialogDescription>
                        Используйте СБП для быстрой оплаты
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                      <div className="bg-muted p-6 rounded-lg space-y-4">
                        <div>
                          <Label className="text-sm text-muted-foreground">Сумма к оплате</Label>
                          <p className="text-3xl font-bold text-primary">{cheat.price}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground mb-2 block">Номер для СБП</Label>
                          <div className="flex items-center gap-2 bg-background p-3 rounded border">
                            <Icon name="Phone" size={20} className="text-primary" />
                            <span className="font-mono text-lg">+7 918 726-50-53</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3 text-sm">
                        <p className="font-semibold">Инструкция по оплате:</p>
                        <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                          <li>Откройте приложение вашего банка</li>
                          <li>Выберите "Перевод по СБП"</li>
                          <li>Введите номер: +7 918 726-50-53</li>
                          <li>Укажите сумму: {cheat.price}</li>
                          <li>Пришлите чек в Telegram @Zirys</li>
                        </ol>
                      </div>
                      <div className="flex gap-2">
                        <a href="https://t.me/Zirys" target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button className="w-full gap-2" variant="default">
                            <Icon name="Send" size={18} />
                            Написать в Telegram
                          </Button>
                        </a>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="guarantees" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Icon name="ShieldCheck" size={64} className="text-primary mx-auto mb-6" />
            <h3 className="text-4xl md:text-5xl font-bold mb-4">Наши гарантии</h3>
            <p className="text-muted-foreground text-lg">Мы ценим каждого клиента</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="CheckCircle" size={44} className="text-primary" />
              </div>
              <h4 className="text-2xl font-semibold mb-4">100% Доставка</h4>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Гарантируем получение чита сразу после оплаты. Если возникнут проблемы — вернем деньги.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="RotateCcw" size={44} className="text-primary" />
              </div>
              <h4 className="text-2xl font-semibold mb-4">Возврат средств</h4>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Если чит не работает или возникла ошибка — вернем полную стоимость в течение 24 часов.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Headphones" size={44} className="text-primary" />
              </div>
              <h4 className="text-2xl font-semibold mb-4">24/7 Поддержка</h4>
              <p className="text-muted-foreground leading-relaxed text-lg">
                AI-ассистент и живая поддержка всегда на связи. Поможем с установкой и настройкой.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <Icon name="HelpCircle" size={64} className="text-primary mx-auto mb-6" />
            <h3 className="text-4xl md:text-5xl font-bold mb-4">Частые вопросы</h3>
            <p className="text-muted-foreground text-lg">Ответы на популярные вопросы</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="bg-background border rounded-xl px-6 hover:border-primary transition-colors">
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline py-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <footer className="border-t border-border py-16 px-4 bg-muted/20">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Icon name="Shield" className="text-primary" size={42} />
            <h2 className="text-4xl font-bold text-primary">LebroDLC</h2>
          </div>
          <p className="text-muted-foreground mb-10 text-lg">Премиум читы для Oxide Survival Island</p>
          <div className="flex gap-4 justify-center mb-10 flex-wrap">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="gap-2 h-12 px-6">
                  <Icon name="Bot" size={20} />
                  AI Поддержка
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Icon name="Bot" className="text-primary" />
                    AI Поддержка
                  </SheetTitle>
                  <SheetDescription>
                    Умный ассистент ответит на ваши вопросы
                  </SheetDescription>
                </SheetHeader>
                <ChatSupport />
              </SheetContent>
            </Sheet>
            <a href="https://t.me/Zirys" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2 h-12 px-6">
                <Icon name="Send" size={20} />
                Telegram
              </Button>
            </a>
          </div>
          <div className="text-sm text-muted-foreground space-y-2">
            <p className="text-base">Создатель сайта: <a href="https://t.me/Zirys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">@Zirys</a></p>
            <p>© 2025 LebroDLC. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
