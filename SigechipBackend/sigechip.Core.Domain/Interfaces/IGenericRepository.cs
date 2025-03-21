using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace sigechip.Core.Domain.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAll();
        Task<IEnumerable<T>> GetAll(params Expression<Func<T, object>>[] includes);
        Task<T> GetById(int id);
        Task<T> GetById(int id, params Expression<Func<T, object>>[] includes);
        Task Add(T entity);
        Task Update(int id, T entity);
        Task Delete(int id);
    }
}
