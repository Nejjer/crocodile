﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using crocodile_back.Clients;
using crocodile_back.Controllers;

namespace crocodile_back.Hubs;

public class CanvasHub : Hub<ICanvasClient>
{
    public async Task SendMessage([FromBody]string base64)
    {
        await Clients.All.ReceiveCanvas(base64);
    }
}