using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using Newtonsoft.Json;

namespace ngNet.Controllers
{
    [Route("api/[controller]")]
    public class HomeController : Controller
    {

        private readonly IHttpClientFactory _clientFactory;

        public HomeController(IHttpClientFactory httpClientFactory)
        {
            _clientFactory = httpClientFactory;
        }
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> GetWPContent()
        {
            string page = HttpContext.Request.Query["page"].ToString();
            string baseUrl = "https://happycampervan.co.uk/wp-json/wp/v2/";
            string url = baseUrl + page;
            var client = _clientFactory.CreateClient();
            string response = await client.GetStringAsync(url);
            return Json(JsonConvert.DeserializeObject(response));
        }

        [HttpGet("[action]")]
        public ServerConfig GetTimerInterval()
        {

            return (new ServerConfig
            {
                timerInterval = 1
            });

        }
        public class ServerConfig
        {
            public int timerInterval { get; set; }

        }
    }
}
