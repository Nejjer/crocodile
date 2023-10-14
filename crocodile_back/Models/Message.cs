namespace crocodile_back.Models;

public class Message
{
    public string id { get; set; }
    public string roomId { get; set; }
    public string text { get; set; }

    public Message(string text, string roomId, string id)
    {
        this.id = id;
        this.text = text;
        this.roomId = roomId;
    }
}