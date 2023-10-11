namespace crocodile_back.Models;

public class CustomError
{
    public string message { get; set; }

    public CustomError(string message)
    {
        this.message = message;
    }
}