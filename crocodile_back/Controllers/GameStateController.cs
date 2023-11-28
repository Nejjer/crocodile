using crocodile_back.Clients;
using crocodile_back.Hubs;
using crocodile_back.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace crocodile_back.Controllers;

[ApiController]
[Route("gamestate")]
public class GameStateController : Controller
{
    private readonly IHubContext<GameStateHub, IGameStateClient> _gameStateHub;

    public GameStateController(IHubContext<GameStateHub, IGameStateClient> gameStateHub)
    {
        _gameStateHub = gameStateHub;
    }
    
    [HttpPost("login/{roomId}")]
    public IActionResult JoinInRoom([FromRoute] string roomId, [FromBody] CreateProfileRequest req)
    {
        Response.Headers["content-type"] = "application/json";

        if (StaticData.Rooms.TryGetValue(roomId, out var room))
        {
            var user = new User(Guid.NewGuid().ToString().Substring(0, 5), req.name,
                room.GameState.UserList.Count == 0);
            room.GameState.AddUser(user, this);
            Logger.Write("Create user id" + user.id + "name:" + user.name);
            return Ok(user.id);
        }

        return NotFound("Комната не найдена");
    }


    [HttpPost("{roomId}/start")]
    public async Task StartGame([FromRoute] string roomId)
    {
        if (StaticData.Rooms.TryGetValue(roomId, out var room))
        {
            Logger.Write("Found Room: " + room.id);
            room.GameState.StartGame();
            await _gameStateHub.Clients.Group(roomId).ReceiveGameState(room.GameState);
        }
    }

    [HttpPost("{roomId}/continue")]
    public async Task ContinueGame([FromRoute] string roomId)
    {
        if (StaticData.Rooms.TryGetValue(roomId, out var room))
        {
            Logger.Write("Found Room: " + room.id);
            room.GameState.StartNewRound();
            await _gameStateHub.Clients.Group(roomId).ReceiveGameState(room.GameState);
        }
    }

    public async Task SendGameState(GameState gameState, string roomId)
    {
        await _gameStateHub.Clients.Group(roomId).ReceiveGameState(gameState);
    }

    [HttpPost("joinGameStateHub")]
    public async Task CreateRoom([FromBody] IConnectionInfo connectionInfo)
    {
        await _gameStateHub.Groups.AddToGroupAsync(connectionInfo.connectionId, connectionInfo.roomId);
    }
}