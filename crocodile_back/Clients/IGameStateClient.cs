using crocodile_back.Models;

namespace crocodile_back.Clients;

public interface IGameStateClient
{
    Task ReceiveGameState(GameState gameState);
}