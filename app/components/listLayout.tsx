import { useState } from 'react';

type Blog = {
  title: string;
  content: string;
  // Add any other properties you have in your blog post
};

type BlogListProps = {
  blogs: Blog[];
  postsPerPage: number;
};

export default function BlogList(blogs: Blog[], postsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = blogs.slice(firstPostIndex, lastPostIndex);

  const totalPages = Math.ceil(blogs.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {currentPosts.map((blog, index) => (
        <div key={index}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
        </div>
      ))}

      <div>
        {Array.from(Array(totalPages), (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`mr-2 px-3 py-1 rounded ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

