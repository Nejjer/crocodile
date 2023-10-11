using crocodile_back.Clients;
using crocodile_back.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace crocodile_back.Hubs;

public class ChatHub : Hub<IChatClient>
{
    public async Task SendMessage([FromBody]Message message)
    {
        await Clients.All.ReceiveMessage(message);
    }

    public async Task ReceiveChangedMessageStatus([FromBody] Message message)
    {
        await Clients.All.ReceiveChangedMessageStatus(message);
    }
}