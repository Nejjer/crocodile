using crocodile_back.Controllers;

namespace crocodile_back.Clients;

public interface ICanvasClient
{
    Task ReceiveCanvas(string base64);
}