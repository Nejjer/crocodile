namespace crocodile_back.Models;

public class Room
{
    public Room(string id)
    {
        this.id = id;
        GameState = new GameState(this);
    }


    public string id { get; set; }

    public GameState GameState { get; set; }
}