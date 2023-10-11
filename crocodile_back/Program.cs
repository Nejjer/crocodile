using crocodile_back.Hubs;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddSignalR();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();


var app = builder.Build();
//Configure the HTTP request pipeline.
app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true) // allow any origin
    .AllowCredentials());

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapHub<ChatHub>("/chat");
//app.MapHub<CanvasHub>("/canvas");
app.MapControllers();
//StaticData.ParseDictionaryWords();
app.Run();