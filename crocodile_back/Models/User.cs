
namespace crocodile_back.Models;

public class User
{
    public string id { get; set; }
    public string name { get; set; }

    public User(string id, string name)
    {
        this.id = id;
        this.name = name;
    }
}