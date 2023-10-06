using crocodile_back.Models;
using Microsoft.AspNetCore.Mvc;

namespace crocodile_back.Controllers;

[ApiController]
[Route("room")]
public class UserController : Controller
{
    [HttpPost("create")]
    public IActionResult CreateRoom()
    {
        Response.Headers["content-type"] = "application/json";
        var room = new Room(Guid.NewGuid().ToString().Substring(0,5));
        StaticData.Rooms.Add(room.id, room);
        Logger.Write("Create room id" + room.id);
        return Ok(room.id);
    }
    
    [HttpPost("join")]
    public IActionResult JoinRoom([FromBody] string roomId)
    {
        Response.Headers["content-type"] = "application/json";

        if (StaticData.Rooms.TryGetValue(roomId, out var room))
        {
            return Ok(room.id);
        }

        return NotFound();
    }
}