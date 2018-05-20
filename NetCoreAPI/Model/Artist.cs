using System.Collections.Generic;
using Newtonsoft.Json;

namespace Model
{
    public class Artist
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public ICollection<Song> Songs {get;set;}
    }   
}