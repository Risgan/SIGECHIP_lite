using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;

namespace sigechip.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [ApiVersion("1.0")]
    public class BaseController : ControllerBase
    {
        public BaseController()
        {
            
        }
    }
}
