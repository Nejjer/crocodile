using crocodile_back.Models;
using Microsoft.AspNetCore.Mvc;

namespace crocodile_back.Controllers;

[ApiController]
[Route("profile")]
public class ProfileController : Controller
{
    [HttpPost("login/{roomId}")]
    public IActionResult CreateRoom([FromRoute] string roomId, [FromBody] CreateProfileRequest req)
    {
        Response.Headers["content-type"] = "application/json";

        if (StaticData.Rooms.TryGetValue(roomId, out var room))
        {
            var user = new User(Guid.NewGuid().ToString().Substring(0,5), req.name);
            if (room.UserList.Count == 0) room.Admin = user.id;
            room.UserList.Add(user.id, user);
            Logger.Write("Create user id" + user.id + "name:" + user.name);
            return Ok(user.id);
        }

        return NotFound("Room not found");
    }
}