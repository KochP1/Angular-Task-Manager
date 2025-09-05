using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using ProjectManagmentBackend.Data;
using ProjectManagmentBackend.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAutoMapper(typeof(Program).Assembly);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));



var origenesPermitidos = builder.Configuration.GetSection("OrígenesPermitidos").Get<string[]>();
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("PermitirTodo", opcionesCors =>
    {
        opcionesCors.WithOrigins(origenesPermitidos!)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithExposedHeaders("cantidad-total-registros");
    });
});


builder.Services.AddControllers().AddJsonOptions(opciones => opciones.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.Services.AddTransient<IProjectsServices, ProjectsServices>();
builder.Services.AddTransient<ITasksServices, TasksServices>();
builder.Services.AddTransient<ISubTaskServices, SubTaskServices>();


builder.Services.AddSwaggerGen();
var app = builder.Build();

app.UseCors("PermitirTodo");

app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();
app.Run();

// S5Q2S88