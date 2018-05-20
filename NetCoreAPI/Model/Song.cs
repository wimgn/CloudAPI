using System.Collections.Generic;
using Newtonsoft.Json;

namespace Model
{
    public class Song
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Genre {get; set;}
        public Artist Artist { get; set; }
    }
}