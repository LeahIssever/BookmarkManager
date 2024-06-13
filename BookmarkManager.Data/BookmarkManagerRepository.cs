using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.Intrinsics.X86;
using System.Text;
using System.Threading.Tasks;

namespace BookmarkManager.Data
{
    public class BookmarkManagerRepository
    {
        private readonly string _connectionString;

        public BookmarkManagerRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<TopBookmark> GetTopFiveBookmarks()
        {
            using var context = new BookmarkManagerDataContext(_connectionString);
            var uniqueBookmarks = new List<TopBookmark>();
            foreach(Bookmark bookmark in context.Bookmarks.ToList())
            {
                var topBookmark = uniqueBookmarks.FirstOrDefault(b => b.Url == bookmark.Url);
                if(topBookmark == null)
                {
                    topBookmark = new TopBookmark
                    {
                        Url = bookmark.Url
                    };
                    uniqueBookmarks.Add(topBookmark);
                }
                topBookmark.Count++;
            }
            return uniqueBookmarks.OrderByDescending(b => b.Count).Take(5).ToList();
        }

        public List<Bookmark> GetBookmarksByUserId(int id)
        {
            using var context = new BookmarkManagerDataContext(_connectionString);
            return context.Bookmarks.Where(b => b.UserId == id).ToList();
        }

        public void AddUser(User user, string password)
        {
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);
            using var context = new BookmarkManagerDataContext(_connectionString);
            context.Users.Add(user);
            context.SaveChanges();
        }

        public User Login(string email, string password)
        {
            var user = GetByEmail(email);
            if(user == null)
            {
                return null;
            }
            var isValidPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (!isValidPassword)
            {
                return null;
            }
            return user;
        }

        public User GetByEmail(string email)
        {
            using var context = new BookmarkManagerDataContext(_connectionString);
            return context.Users.FirstOrDefault(u => u.Email == email);
        }

        public void AddBookmark(Bookmark bookmark)
        {
            using var context = new BookmarkManagerDataContext(_connectionString);
            context.Bookmarks.Add(bookmark);
            context.SaveChanges();
        }

        public void UpdateBookmark(string title, int bookmarkId)
        {
            using var context = new BookmarkManagerDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"UPDATE Bookmarks SET Title = {title} WHERE Id = {bookmarkId}");
        }

        public void DeleteBookmark(int bookmarkId)
        {
            using var context = new BookmarkManagerDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Bookmarks WHERE Id = {bookmarkId}");
        }
    }
}
