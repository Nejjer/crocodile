using crocodile_back.Clients;
using crocodile_back.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace crocodile_back.Hubs;

public class GameStateHub : Hub<IGameStateClient>
{
    public async Task SendGameState([FromBody]GameState gameState)
    {
        await Clients.All.ReceiveGameState(gameState);
    }
}