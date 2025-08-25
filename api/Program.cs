// using api.Repositoris;

// var builder = WebApplication.CreateBuilder(args);

// #region MongoDbSettings
// ///// get values from this file: appsettings.Development.json /////
// // get section
// builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection(nameof(MongoDbSettings)));


// // get values
// builder.Services.AddSingleton<IMongoDbSettings>(serviceProvider =>
// serviceProvider.GetRequiredService<IOptions<MongoDbSettings>>().Value);


// // get connectionString to the db
// builder.Services.AddSingleton<IMongoClient>(serviceProvider =>
// {
//     MongoDbSettings uri = serviceProvider.GetRequiredService<IOptions<MongoDbSettings>>().Value;


//     return new MongoClient(uri.ConnectionString);
// });


// #endregion MongoDbSettings

// builder.Services.AddScoped<IAccountRepository, AccountRepository>();

// builder.Services.AddControllers();


// var app = builder.Build();

// app.MapGet("/", () => "Hello World!");

// app.Run();













var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

#region MongoDbSettings
///// get values from this file: appsettings.Development.json /////
// get section
builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection(nameof(MongoDbSettings)));


// get values
builder.Services.AddSingleton<IMongoDbSettings>(serviceProvider =>
serviceProvider.GetRequiredService<IOptions<MongoDbSettings>>().Value);


// get connectionString to the db
builder.Services.AddSingleton<IMongoClient>(serviceProvider =>
{
    MongoDbSettings uri = serviceProvider.GetRequiredService<IOptions<MongoDbSettings>>().Value;


    return new MongoClient(uri.ConnectionString);
});


#endregion MongoDbSettings

#region Cors: baraye ta'eede Angular HttpClient requests
builder.Services.AddCors(options =>
    {
        options.AddDefaultPolicy(policy =>
            policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));
    });
#endregion Cors


builder.Services.AddScoped<IAccountRepository, AccountRepository>();
builder.Services.AddScoped<IMemberRepository, MemberRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();