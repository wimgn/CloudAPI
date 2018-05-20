

namespace Model
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ISBN { get; set; }
        public int Pages { get; set; }
        public string Genre {get; set;}
        public Author Author { get; set; }
        // public int AuthorId {get;set;}
    }
}