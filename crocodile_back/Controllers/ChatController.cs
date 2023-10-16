using System.Text.Json;
using crocodile_back.Clients;
using crocodile_back.Hubs;
using crocodile_back.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace crocodile_back.Controllers;

[ApiController]
[Route("chat")]
public class ChatController : Controller
{
    private readonly IHubContext<ChatHub, IChatClient> _chatHub;
    public ChatController(IHubContext<ChatHub, IChatClient> chatHub)
    {
        _chatHub = chatHub;
    }
    
    [HttpPost("message")]
    public async Task AddMessage([FromBody] MessageRequest requestMessage)
    {
        var message = new Message(requestMessage.text, requestMessage.roomId,
            Guid.NewGuid().ToString().Substring(0, 10));
        StaticData.Messages[message.roomId].Add(message);
        await _chatHub.Clients.Group(message.roomId).ReceiveMessage(message);
    }

    // [HttpPost("changeStatus")]
    // public async Task ChangeStatus([FromBody] Message message)
    // {
    //     StaticData.Messages[message.roomId].Find(msg => msg.id == message.id)!.status = message.status;
    //     await _chatHub.Clients.Group(message.roomId).ReceiveChangedMessageStatus(message);
    // }

    [HttpPost("joinChatHub")]
    public async Task CreateRoom([FromBody] IConnectionInfo connectionInfo)
    {
        if (!StaticData.Messages.ContainsKey(connectionInfo.roomId))
            StaticData.Messages[connectionInfo.roomId] = new List<Message>();
        await _chatHub.Groups.AddToGroupAsync(connectionInfo.connectionId, connectionInfo.roomId);
    }

    [HttpGet("story")]
    public IActionResult GetChatStory()
    {
        Response.Headers["content-type"] = "application/json";
        var data = JsonSerializer.Serialize(new List<Message>());
        if (StaticData.Messages.ContainsKey(Request.Headers["room-id"]))
        {
            data = JsonSerializer.Serialize(StaticData.Messages[Request.Headers["room-id"]]);

        }
        return Ok(data);
    }

    public class MessageRequest
    {
        public string text { get; set; }
        public string roomId { get; set; }
    }
}
