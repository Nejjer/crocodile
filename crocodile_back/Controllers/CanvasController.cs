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
            if (StaticData.CanvasMap.TryGetValue(img.roomId, out var canvas))
                canvas.base64 = img.base64;
            await _canvasHub.Clients.Group(img.roomId).ReceiveCanvas(img.base64);
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
        public string base64 { get; set; }
        public string roomId { get; set; }
    }
}