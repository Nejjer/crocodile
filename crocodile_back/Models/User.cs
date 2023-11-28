namespace crocodile_back.Models;

public class User
{
    public User(string id, string name, bool isAdmin)
    {
        this.id = id;
        this.name = name;
        this.isAdmin = isAdmin;
        score = 0;
    }

    public string id { get; set; }
    public string name { get; set; }

    public bool isAdmin { get; set; }
    public int score { get; set; }

    public void AddScore(int score)
    {
        this.score += score;
    }
}