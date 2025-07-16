import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Bell, X, AlertTriangle, Info, CheckCircle, TrendingDown } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useNotifications } from "../hooks/useApiClient";

interface Notification {
  id: string;
  type: 'urgent' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionable: boolean;
  metadata?: {
    metric?: string;
    value?: number;
    threshold?: number;
  };
}

export function NotificationSystem() {
  const { notifications, isLoading, markAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n: Notification) => !n.read).length;

  useEffect(() => {
    // Mostrar toast para notificaciones urgentes no leídas
    const urgentNotifications = notifications.filter((n: Notification) => 
      n.type === 'urgent' && !n.read
    );
    
    if (urgentNotifications.length > 0) {
      const notification = urgentNotifications[0];
      toast.error(notification.title, {
        description: notification.message,
        action: {
          label: "Ver Dashboard",
          onClick: () => setIsOpen(true)
        }
      });
    }
  }, [notifications]);

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
      toast.success("Notificación marcada como leída");
    } catch (error) {
      toast.error("Error al marcar notificación como leída");
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'warning':
        return <TrendingDown className="w-4 h-4 text-yellow-600" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-600" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'info':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <Bell className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <div className="relative">
      {/* Botón de notificaciones */}
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center text-xs">
            {unreadCount}
          </span>
        )}
      </Button>

      {/* Panel de notificaciones */}
      {isOpen && (
        <div className="absolute right-0 top-10 z-50">
          <Card className="w-96 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span>Notificaciones</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  No hay notificaciones
                </p>
              ) : (
                notifications.map((notification: Notification) => (
                  <div 
                    key={notification.id}
                    className={`p-3 rounded-lg border ${getTypeColor(notification.type)} ${
                      !notification.read ? 'border-l-4 border-l-primary' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getIcon(notification.type)}
                        <div className="flex-1">
                          <h5 className="font-medium text-sm">{notification.title}</h5>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(notification.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {notification.metadata && (
                      <div className="mt-2 pt-2 border-t text-xs">
                        <span className="font-medium">Valor actual: </span>
                        <span className={notification.metadata.value! > notification.metadata.threshold! ? 'text-red-600' : 'text-green-600'}>
                          {notification.metadata.value}
                          {notification.metadata.metric?.includes('rate') ? '%' : ''}
                        </span>
                        <span className="text-muted-foreground">
                          {' '}(Umbral: {notification.metadata.threshold}
                          {notification.metadata.metric?.includes('rate') ? '%' : ''})
                        </span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center mt-3">
                      {!notification.read && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          Marcar como leído
                        </Button>
                      )}
                      {notification.actionable && (
                        <Button size="sm">
                          Tomar Acción
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}