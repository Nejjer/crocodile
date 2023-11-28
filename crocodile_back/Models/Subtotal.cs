namespace crocodile_back.Models;

public class AddScore
{
    public AddScore(string id, int scoreAdd)
    {
        ID = id;
        ScoreAdd = scoreAdd;
    }

    private string ID { get; set; }
    private int ScoreAdd { get; set; }
}

public class Subtotal
{
    public string DivineID { get; set; }
    public string DrawedID { get; set; }
    public AddScore[] AddScore { get; set; }
}