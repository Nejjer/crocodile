using System.Text.RegularExpressions;

namespace crocodile_back.Models;

public class Room
{
    public string id { get; set; }
    public string Admin { get; set; }

    public Room(string id)
    {
        this.id = id;
    }
}