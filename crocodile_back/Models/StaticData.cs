using System.Text.RegularExpressions;
using crocodile_back.Controllers;

namespace crocodile_back.Models;

public static class StaticData
{
    public static Dictionary<string, Room> Rooms = new();
    public static Dictionary<string, List<Message>> MessagesMap = new();
    public static Dictionary<string, Canvas> CanvasMap = new ();

}