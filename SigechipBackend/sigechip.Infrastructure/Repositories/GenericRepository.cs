using Microsoft.EntityFrameworkCore;
using sigechip.Core.Domain.Interfaces;
using sigechip.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sigechip.Infrastructure.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly AplicationDbContext _context;
        protected readonly DbSet<T> _dbSet;

        public GenericRepository(AplicationDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public async Task Add(T entity)
        {
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var entity = _dbSet.Find(id);
            if (entity != null)
            {             
                _dbSet.Remove(entity);
                await _context.SaveChangesAsync();
            }

        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<T> GetById(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task Update(int id, T entity)
        {
            T _entity = await GetById(id);
            _entity = entity;
            _dbSet.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();

        }
    }
}
