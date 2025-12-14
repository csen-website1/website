import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Message {
  text: string;
  date: string;
}

interface MessageBasedProps {
  name: string;
  type: string;
  email: string;
  message: Message[];
}

export default function MessageBased({ name, type, message, email }: MessageBasedProps) {
  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      {/* User Header */}
      <header className="flex items-center gap-4">
        <Avatar className="h-14 w-14 ring-4 ring-white shadow-lg">
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-lg font-semibold">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              {type}
            </span>
            <span>•</span>
            <span>{email}</span>
          </div>
        </div>
      </header>

      {/* Messages */}
      <Card className="shadow-lg border-0">
        <CardHeader className="border-b bg-gray-50/50">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Historique des messages
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {!message || message.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Aucun message à afficher
            </div>
          ) : (
            <div className="divide-y">
              {message.map((msg, index) => (
                <div
                  key={`message-${index}`}
                  className="p-4 hover:bg-gray-50/50 transition-colors"
                >
                  <p className="text-gray-700 leading-relaxed">{msg.text}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    {formatDate(msg.date)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
