using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VMSAPI.Data;
using VMSAPI.Models;
using VMSAPI.Models.NonDbModels;

namespace VMSAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SocietiesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SocietiesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Societies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Society>>> GetSocieties()
        {
            return await _context.Societies.ToListAsync();
        }

        // GET: api/Societies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Society>> GetSociety(int id)
        {
            var society = await _context.Societies.FindAsync(id);

            if (society == null)
            {
                return NotFound();
            }

            return society;
        }

        // PUT: api/Societies/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSociety(int id, Society society)
        {
            if (id != society.SId)
            {
                return BadRequest();
            }

            _context.Entry(society).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SocietyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Societies
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Society>> PostSociety(SocietyDTO society)
        {
            Society s = new Society
            {
                SName = society.SName,
                Address = society.Address,
                NumberofBlocks= society.NumberofBlocks,
                NumberofUnits= society.NumberofUnits,
                SEmail = society.SEmail,
                SPhone = society.SPhone,
                TimeRegistered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"))
            };
            _context.Societies.Add(s);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSociety", new { id = s.SId }, s);
        }

        // DELETE: api/Societies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSociety(int id)
        {
            var society = await _context.Societies.FindAsync(id);
            if (society == null)
            {
                return NotFound();
            }

            _context.Societies.Remove(society);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SocietyExists(int id)
        {
            return _context.Societies.Any(e => e.SId == id);
        }
    }
}
