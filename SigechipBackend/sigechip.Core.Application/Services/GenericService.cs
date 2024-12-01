using sigechip.Core.Application.Interfaces;
using sigechip.Core.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sigechip.Core.Application.Services
{
    public class GenericService<T> : IGenericService<T> where T : class
    {
        private readonly IGenericRepository<T> _repository;

        public GenericService(IGenericRepository<T> repository)
        {
            _repository = repository;
        }

        public async Task AddAsync(T entity)
        {
            await _repository.Add(entity);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.Delete(id);
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _repository.GetAll();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task UpdateAsync(int id, T entity)
        {
            await _repository.Update(id, entity);
        }
    }
}
