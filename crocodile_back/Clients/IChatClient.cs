using crocodile_back.Models;

namespace crocodile_back.Clients;

public interface IChatClient
{
    Task ReceiveMessage(Message message);
    Task ReceiveChangedMessageStatus(Message message);
}