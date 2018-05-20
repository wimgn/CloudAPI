using System.Collections.Generic;
using Newtonsoft.Json;

namespace Model
{
    public class Author
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string FirstName { get; set; }
        [JsonIgnore]
        public ICollection<Book> Books {get;set;}
    }   
}