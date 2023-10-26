using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using crocodile_back.Clients;
using crocodile_back.Hubs;
using crocodile_back.Models;

namespace crocodile_back.Controllers
{
    [ApiController]
    [Route("canvas")]
    public class CanvasController : Controller
    {
        private readonly IHubContext<CanvasHub, ICanvasClient> _canvasHub;
        public CanvasController(IHubContext<CanvasHub, ICanvasClient> canvasHub)
        {
            _canvasHub = canvasHub;
        }

        [HttpPost("post")]
        public async Task Post([FromBody] Canvas img)
        {
            if (StaticData.CanvasMap.TryGetValue(img.roomName, out var canvas))
                canvas.url = img.url;
            await _canvasHub.Clients.Group(img.roomName).ReceiveCanvas(img);
        }
        
        [HttpGet("get")]
        public IActionResult Get()
        {
            Response.Headers["content-type"] = "application/json";
            return Ok(StaticData.CanvasMap[Request.Headers["room-id"]]);
        }
        
        [HttpPost("joinCanvasHub")]
        public async Task CreateRoom([FromBody] IConnectionInfo connectionInfo)
        {
            StaticData.CanvasMap.TryAdd(connectionInfo.roomId, new Canvas());
            await _canvasHub.Groups.AddToGroupAsync(connectionInfo.connectionId, connectionInfo.roomId);
        }
    }

    public static class Data
    {
        public static Canvas ctx { get; set; }
    }
    public class Canvas
    {
        public string url { get; set; }
        public string roomName { get; set; }
    }
}