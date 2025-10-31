import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedCheat, setSelectedCheat] = useState<string | null>(null);

  const cheats = [
    {
      id: 1,
      name: 'RUST Premium ESP',
      description: 'Полный обзор карты, игроков и лута',
      price: '1 499₽',
      features: ['ESP игроков', 'ESP лута', 'ESP животных', 'Радар'],
      popular: true,
    },
    {
      id: 2,
      name: 'Oxide Aimbot Pro',
      description: 'Точная наводка на цели',
      price: '1 899₽',
      features: ['Aim assist', 'Triggerbot', 'Recoil control', 'Silent aim'],
      popular: true,
    },
    {
      id: 3,
      name: 'Survival Ultimate',
      description: 'Полный набор функций',
      price: '2 999₽',
      features: ['ESP + Aimbot', 'Speedhack', 'Fly', 'No recoil', 'Radar'],
      popular: false,
    },
    {
      id: 4,
      name: 'Basic Pack',
      description: 'Начальный набор читов',
      price: '799₽',
      features: ['ESP игроков', 'Базовый радар'],
      popular: false,
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
      answer: 'Напишите создателю в Telegram: @Zirys. Отвечаем в течение 1 часа.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon name="Shield" className="text-primary" size={32} />
            <h1 className="text-2xl font-bold text-primary">LebroDLC</h1>
          </div>
          <Button variant="outline" className="gap-2">
            <Icon name="MessageCircle" size={18} />
            Поддержка
          </Button>
        </div>
      </header>

      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-4 bg-secondary text-secondary-foreground hover:bg-secondary/90">
            🔥 Топ продаж 2024
          </Badge>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            ПРЕМИУМ ЧИТЫ
            <br />
            <span className="text-primary">ДЛЯ OXIDE</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Надежные читы с гарантией работы. Моментальная доставка. Возврат средств при ошибке.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="gap-2 text-lg">
              <Icon name="ShoppingCart" size={20} />
              Выбрать чит
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-lg">
              <Icon name="Shield" size={20} />
              Гарантии
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Наши продукты</h3>
            <p className="text-muted-foreground">Выберите подходящий чит для игры</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cheats.map((cheat) => (
              <Card
                key={cheat.id}
                className={`p-6 hover:border-primary transition-all cursor-pointer ${
                  selectedCheat === cheat.name ? 'border-primary shadow-lg shadow-primary/20' : ''
                }`}
                onClick={() => setSelectedCheat(cheat.name)}
              >
                {cheat.popular && (
                  <Badge className="mb-3 bg-secondary text-secondary-foreground">
                    🔥 Популярное
                  </Badge>
                )}
                <h4 className="text-xl font-bold mb-2">{cheat.name}</h4>
                <p className="text-muted-foreground text-sm mb-4">{cheat.description}</p>
                <div className="mb-4">
                  <div className="text-3xl font-bold text-primary">{cheat.price}</div>
                  <div className="text-xs text-muted-foreground">за месяц</div>
                </div>
                <ul className="space-y-2 mb-6">
                  {cheat.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <Icon name="Check" size={16} className="text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full gap-2">
                  <Icon name="ShoppingBag" size={18} />
                  Купить
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Icon name="ShieldCheck" size={48} className="text-primary mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-4">Наши гарантии</h3>
            <p className="text-muted-foreground">Мы ценим каждого клиента</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} className="text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">100% Доставка</h4>
              <p className="text-muted-foreground">
                Гарантируем получение чита сразу после оплаты. Если возникнут проблемы — вернем деньги.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="RotateCcw" size={32} className="text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Возврат средств</h4>
              <p className="text-muted-foreground">
                Если чит не работает или возникла ошибка — вернем полную стоимость в течение 24 часов.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Headphones" size={32} className="text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">24/7 Поддержка</h4>
              <p className="text-muted-foreground">
                Наша команда всегда на связи. Поможем с установкой и настройкой в любое время.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <Icon name="HelpCircle" size={48} className="text-primary mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-4">Частые вопросы</h3>
            <p className="text-muted-foreground">Ответы на популярные вопросы</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left text-lg">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Shield" className="text-primary" size={32} />
            <h2 className="text-2xl font-bold text-primary">LebroDLC</h2>
          </div>
          <p className="text-muted-foreground mb-6">Премиум читы для Oxide Survival Island</p>
          <div className="flex gap-4 justify-center mb-6">
            <Button variant="outline" className="gap-2">
              <Icon name="MessageCircle" size={18} />
              Telegram
            </Button>
            <Button variant="outline" className="gap-2">
              <Icon name="Mail" size={18} />
              Email
            </Button>
          </div>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>Создатель сайта: <a href="https://t.me/Zirys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@Zirys</a></p>
            <p>© 2024 LebroDLC. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
