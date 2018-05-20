
using System.Linq;

namespace Model
{
    public class DBIntitializer
    {
        public static void Initialize(LibraryContext context)
        {
            //Create the db if not yet exists
            context.Database.EnsureCreated();
            
            //Are there already Songs present ?
            if (!context.Songs.Any())
            {
                var posty = new Artist()
                {
                    Name = "Post Malone"
                };
                context.Artists.Add(posty);
                var ra = new Artist()
                {
                    Name = "Rise Against"
                };
                context.Artists.Add(ra);

                //Create new song
                var sn = new Song()
                {
                    Title = "Rich & Sad",
                    Genre = "Rap",
                    Artist = posty
                };
                //Add the book to the collection of books
                context.Songs.Add(sn);
                sn = new Song()
                {
                    Title = "Satellite",
                    Genre = "Rock",
                    Artist = ra
                };
                context.Songs.Add(sn);
                //Save all the changes to the DB
                context.SaveChanges();
            }
        }
    }
}


                

                