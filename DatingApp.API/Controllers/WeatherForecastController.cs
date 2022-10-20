using DatingApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers;
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class WeatherForecastController : ControllerBase
{
    private readonly DataContext _dataContext;
    public WeatherForecastController(DataContext context)
    {
        this._dataContext = context;
    }

    [AllowAnonymous]
    [HttpGet("value",Name = "GetWeatherForecast")]   
    public async Task<IActionResult> GetValue()
    {
        var value = await _dataContext.Values.ToListAsync();
        return Ok(value);   
    }

    [AllowAnonymous]
    [HttpGet("value/{id}", Name = "GetSpecficValue")]
    public async Task<IActionResult> GetValue(int id) {
        var value = await _dataContext.Values.FirstOrDefaultAsync(x => x.Id == id);  
        return Ok(value);
    }
}
