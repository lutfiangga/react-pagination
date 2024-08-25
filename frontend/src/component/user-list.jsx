import { useEffect, useState } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'

const UserList = () => {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(5)
  const [totalPage, setTotalPage] = useState(0)
  const [rows, setRows] = useState(0)
  const [keyword, setKeyword] = useState('')
  const [query, setQuery] = useState('')

  const apiUrl = import.meta.env.VITE_PRIVATE_API_URL

  useEffect(() => {
    getUsers()
  }, [page, keyword, limit])

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/users?search_query=${keyword}&page=${page}&limit=${limit}`
      )
      setUsers(response.data.result)
      setPage(response.data.page)
      setTotalPage(response.data.totalPage)
      setRows(response.data.totalRows)
    } catch (error) {
      console.error('Failed to fetch users:', error)
    }
  }

  const changePage = ({ selected }) => {
    setPage(selected)
  }

  useEffect(() => {
    if (query === '') {
      setKeyword('')
      setPage(0)
    }
  }, [query])

  const searchData = e => {
    e.preventDefault() // Mencegah reload halaman
    setPage(0)
    setKeyword(query)
  }

  const handleFirstPage = () => {
    setPage(0)
  }

  const handleLastPage = () => {
    setPage(totalPage - 1)
  }

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-semibold text-center mb-4'>User List</h2>
      <div className='flex justify-between mb-4'>
        <div className='flex justify-start'>
          <button className='px-4 py-2 bg-gray-500 text-white rounded-md'>
            Add User
          </button>
        </div>
        <div className='flex justify-end'>
          <form onSubmit={searchData} className='flex flex-row gap-2'>
            <input
              type='text'
              value={query}
              onChange={e => setQuery(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded'
              placeholder='Search by name'
            />
            <button
              type='submit'
              className='w-1/2 p-2 bg-blue-500 text-white rounded'
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border'>
          <thead>
            <tr>
              <th className='py-2 px-4 bg-gray-200 border-b'>#</th>
              <th className='py-2 px-4 bg-gray-200 border-b'>Name</th>
              <th className='py-2 px-4 bg-gray-200 border-b'>Email</th>
              <th className='py-2 px-4 bg-gray-200 border-b'>Gender</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan='4' className='py-2 px-4 border-b text-center'>
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user.id} className='hover:bg-gray-100'>
                  <td className='py-2 px-4 border-b text-center'>
                    {page * limit + index + 1}
                  </td>
                  <td className='py-2 px-4 border-b'>{user.name}</td>
                  <td className='py-2 px-4 border-b'>{user.email}</td>
                  <td className='py-2 px-4 border-b'>{user.gender}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className='flex justify-between items-center mt-4'>
        <div className='flex items-center gap-2'>
          <label htmlFor='rowsPerPage' className='mr-2 text-gray-700'>
            Rows per page:
          </label>
          <select
            id='rowsPerPage'
            value={limit}
            onChange={e => {
              setLimit(Number(e.target.value))
              setPage(0) // Reset to the first page
            }}
            className='p-2 border border-gray-300 rounded'
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <p>
            Page: {rows ? page + 1 : 0} of {totalPage}
          </p>
        </div>
        <div className='flex justify-center'>
          <p>
            Showing {limit} of {rows} users
          </p>
        </div>
        <div className='flex justify-end'>
          <nav
            className='pagination justify-center'
            role='pagination'
            aria-label='pagination'
          >
            <ReactPaginate
              key={rows}
              previousLabel='< Prev'
              nextLabel='Next >'
              pageCount={totalPage}
              onPageChange={changePage}
              containerClassName='flex justify-center items-center gap-1'
              pageLinkClassName='px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring'
              previousLinkClassName='px-4 py-2 text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring'
              nextLinkClassName='px-4 py-2 text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring'
              activeLinkClassName='text-white bg-indigo-500 border-indigo-500'
              disabledLinkClassName='px-4 py-2 text-gray-400 bg-white border border-gray-200 rounded cursor-not-allowed'
              pageRangeDisplayed={2}
              marginPagesDisplayed={2}
              breakLabel='...'
              breakClassName='px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded'
              firstLabel='First Page'
              lastLabel='Last Page'
              firstClassName='px-4 py-2 text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring'
              lastClassName='px-4 py-2 text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring'
              onPageActive={selected => setPage(selected.selected)}
              firstLinkClassName='px-4 py-2 text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring'
              lastLinkClassName='px-4 py-2 text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring'
            />
          </nav>
        </div>
      </div>
    </div>
  )
}

export default UserList