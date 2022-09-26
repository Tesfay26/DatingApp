using DatingApp.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private readonly DataContext _dataContext;
    public WeatherForecastController(DataContext context)
    {
        this._dataContext = context;
    }


    [HttpGet("value",Name = "GetWeatherForecast")]   
    public async Task<IActionResult> GetValue()
    {
        var value = await _dataContext.values.ToListAsync();
        return Ok(value);   
    }
    [HttpGet("value/{id}", Name = "GetSpecficValue")]
    public async Task<IActionResult> GetValue(int id) {
        var value = _dataContext.values.FirstOrDefaultAsync(x => x.Id == id);  
        return Ok(value);
    }
}
