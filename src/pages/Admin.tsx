import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  session_id: string;
  message: string;
  admin_reply: string | null;
  created_at: string;
  replied_at: string | null;
}

const Admin = () => {
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(false);

  const ADMIN_API = 'https://functions.poehali.dev/a4bd953a-c78b-413d-b58d-209b2cab214f';

  const authenticate = async () => {
    if (!adminKey.trim()) return;
    
    try {
      const response = await fetch(ADMIN_API, {
        headers: {
          'X-Admin-Key': adminKey
        }
      });
      
      if (response.ok) {
        setIsAuthenticated(true);
        loadMessages();
      } else {
        alert('Неверный ключ доступа');
      }
    } catch (error) {
      alert('Ошибка подключения');
    }
  };

  const loadMessages = async () => {
    if (!adminKey) return;
    
    setLoading(true);
    try {
      const response = await fetch(ADMIN_API, {
        headers: {
          'X-Admin-Key': adminKey
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
    setLoading(false);
  };

  const sendReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(ADMIN_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': adminKey
        },
        body: JSON.stringify({
          message_id: selectedMessage.id,
          reply: replyText
        })
      });
      
      if (response.ok) {
        alert('Ответ отправлен!');
        setReplyText('');
        setSelectedMessage(null);
        loadMessages();
      } else {
        alert('Ошибка отправки');
      }
    } catch (error) {
      alert('Ошибка подключения');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadMessages();
      const interval = setInterval(loadMessages, 10000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8">
          <div className="text-center mb-8">
            <Icon name="Lock" size={48} className="text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Админ-панель LebroDLC</h1>
            <p className="text-muted-foreground">Введите ключ доступа</p>
          </div>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Введите ADMIN_KEY"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && authenticate()}
            />
            <Button onClick={authenticate} className="w-full">
              Войти
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Icon name="Shield" className="text-primary" size={32} />
            <h1 className="text-2xl font-bold">Админ-панель LebroDLC</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={loadMessages} disabled={loading}>
              <Icon name="RefreshCw" size={16} className={loading ? 'animate-spin' : ''} />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsAuthenticated(false)}>
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Icon name="MessageSquare" size={24} className="text-primary" />
              Сообщения ({messages.length})
            </h2>
            <ScrollArea className="h-[calc(100vh-250px)]">
              <div className="space-y-3">
                {messages.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Нет сообщений</p>
                ) : (
                  messages.map((msg) => (
                    <Card
                      key={msg.id}
                      className={`p-4 cursor-pointer hover:border-primary transition-colors ${
                        selectedMessage?.id === msg.id ? 'border-primary' : ''
                      }`}
                      onClick={() => setSelectedMessage(msg)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant={msg.admin_reply ? 'default' : 'secondary'}>
                          {msg.admin_reply ? '✓ Отвечено' : 'Ожидает'}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(msg.created_at).toLocaleString('ru')}
                        </span>
                      </div>
                      <p className="text-sm mb-2">{msg.message}</p>
                      {msg.admin_reply && (
                        <div className="mt-3 p-2 bg-primary/10 rounded text-sm">
                          <p className="text-xs text-muted-foreground mb-1">Ваш ответ:</p>
                          <p>{msg.admin_reply}</p>
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        Сессия: {msg.session_id.substring(0, 20)}...
                      </p>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Icon name="Send" size={24} className="text-primary" />
              Ответить
            </h2>
            {selectedMessage ? (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Сообщение пользователя:</p>
                  <p className="font-medium mb-3">{selectedMessage.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(selectedMessage.created_at).toLocaleString('ru')}
                  </p>
                </div>
                
                {selectedMessage.admin_reply ? (
                  <div className="bg-primary/10 p-4 rounded-lg border border-primary/30">
                    <p className="text-sm text-muted-foreground mb-2">Ваш предыдущий ответ:</p>
                    <p>{selectedMessage.admin_reply}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {selectedMessage.replied_at && new Date(selectedMessage.replied_at).toLocaleString('ru')}
                    </p>
                  </div>
                ) : null}

                <Textarea
                  placeholder="Введите ваш ответ..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
                
                <Button 
                  onClick={sendReply} 
                  disabled={loading || !replyText.trim()}
                  className="w-full"
                >
                  {loading ? 'Отправка...' : 'Отправить ответ'}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <Icon name="MessageCircle" size={48} className="mb-4 opacity-50" />
                <p>Выберите сообщение для ответа</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
