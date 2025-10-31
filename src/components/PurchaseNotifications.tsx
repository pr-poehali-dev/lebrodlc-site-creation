import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Notification {
  id: number;
  name: string;
  product: string;
  time: string;
}

const PurchaseNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);

  const names = [
    'Александр', 'Дмитрий', 'Максим', 'Артем', 'Иван', 'Михаил',
    'Андрей', 'Никита', 'Егор', 'Даниил', 'Кирилл', 'Сергей',
    'Алексей', 'Владислав', 'Роман', 'Денис', 'Тимофей', 'Илья'
  ];

  const products = ['LebroDLC 1D', 'LebroDLC 7D', 'LebroDLC 30D'];

  const generateNotification = (): Notification => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const minutesAgo = Math.floor(Math.random() * 15) + 1;
    
    return {
      id: Date.now(),
      name: randomName,
      product: randomProduct,
      time: `${minutesAgo} ${minutesAgo === 1 ? 'минуту' : minutesAgo < 5 ? 'минуты' : 'минут'} назад`
    };
  };

  useEffect(() => {
    const showNotification = () => {
      const notification = generateNotification();
      setCurrentNotification(notification);

      setTimeout(() => {
        setCurrentNotification(null);
      }, 5000);
    };

    const initialDelay = setTimeout(showNotification, 5000);

    const interval = setInterval(() => {
      showNotification();
    }, Math.random() * 20000 + 15000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  if (!currentNotification) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-in slide-in-from-left duration-500">
      <div className="bg-card border-2 border-primary/30 rounded-2xl shadow-2xl p-4 max-w-sm backdrop-blur-md">
        <div className="flex items-start gap-3">
          <div className="bg-primary/20 rounded-full p-2">
            <Icon name="ShoppingBag" size={20} className="text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm mb-1">
              <span className="text-primary">{currentNotification.name}</span> купил
            </p>
            <p className="text-sm text-muted-foreground mb-1">
              {currentNotification.product}
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Icon name="Clock" size={12} />
              {currentNotification.time}
            </p>
          </div>
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
            ✓
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default PurchaseNotifications;
