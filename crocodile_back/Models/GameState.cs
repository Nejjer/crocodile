using crocodile_back.Controllers;
using Timer = System.Timers.Timer;

namespace crocodile_back.Models;

public enum GameStateEnum
{
    PreStart,
    Drawing,
    Subtotal,
    End
}

public class GameState
{
    private const int _secondOnRound = 90;

    private const int ScoreForWin = 5;

    private readonly Room _room;
    private int _currentIndexUserDraw;
    private GameStateController _gameStateController;
    private Timer _timer;

    public GameState(Room room)
    {
        UserList = new List<User>();
        gameState = GameStateEnum.PreStart;
        _room = room;
    }

    private int StaySecond { get; set; }

    public string CurrentWord { get; set; }
    public string DrawUserId { get; set; }
    public GameStateEnum gameState { get; set; }
    public Subtotal Subtotal { get; set; }
    public List<User> UserList { get; set; }
    public string AdminID { get; set; }
    public string WinnerId { get; set; }

    /**
     * Добавляем юзера если он первый, то делаем админом
     */
    public void AddUser(User user, GameStateController gameStateController)
    {
        _gameStateController = gameStateController;
        if (UserList.Count == 0) AdminID = user.id;
        UserList.Add(user);
        _gameStateController.SendGameState(this, _room.id);
    }

    public void StartGame()
    {
        gameState = GameStateEnum.Drawing;
        DrawUserId = UserList[_currentIndexUserDraw % UserList.Count].id;
        _currentIndexUserDraw++;
        CurrentWord = "Hui";
        StartTimer();
        _gameStateController.SendGameState(this, _room.id);
    }

    private async Task StartTimer()
    {
        StaySecond = _secondOnRound;
        var periodicTimer = new PeriodicTimer(new TimeSpan(0, 0, 1));
        while (await periodicTimer.WaitForNextTickAsync())
        {
            StaySecond--;
            if (StaySecond == 0)
            {
                EndRound(null);
                break;
            }
            await _gameStateController.SendGameState(this, _room.id);
        }
    }

    public void EndRound(string? divineId) //угадавший пользователь
    {
        gameState = GameStateEnum.Subtotal;
        Subtotal = new Subtotal();
        var addScore = new List<AddScore>();
        //рисующему добавляем 2 балла
        UserList.Find(el => el.id == DrawUserId)?.AddScore(2);
        Subtotal.DrawedID = DrawUserId;
        addScore.Add(new AddScore(DrawUserId, 2));
        if (divineId != null)
        {
            UserList.Find(el => el.id == divineId)?.AddScore(1);
            Subtotal.DivineID = divineId;
            addScore.Add(new AddScore(divineId, 1));
        }

        Subtotal.AddScore = addScore.ToArray();

        if (UserList.Find(el => el.score >= ScoreForWin) != null)
        {
            EndGame();
            return;
        }

        _gameStateController.SendGameState(this, _room.id);
    }

    public void StartNewRound()
    {
        gameState = GameStateEnum.Drawing;
        Subtotal = null;

        DrawUserId = UserList[_currentIndexUserDraw % UserList.Count].id;
        _currentIndexUserDraw++;

        CurrentWord = "Penis";
        StartTimer();

        _gameStateController.SendGameState(this, _room.id);
    }

    public void EndGame()
    {
        gameState = GameStateEnum.End;
        DrawUserId = null;
        CurrentWord = null;
        //с наибольшим колввом очков
        WinnerId = UserList.OrderByDescending(x => x).First().id;

        _gameStateController.SendGameState(this, _room.id);
    }
}