using System.Text.RegularExpressions;

namespace crocodile_back.Models;

public static class StaticData
{
    public static Dictionary<string, Room> Rooms = new();
    public static Dictionary<string, List<Message>> Messages = new();
}