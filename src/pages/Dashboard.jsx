import { useEffect, useState } from "react"
import axios from "axios"

const Dashboard = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await axios.get("http://tinylearners.onrender.com/api/activity/dashboard")
      setData(res.data)
    } catch (err) {
      console.log("Dashboard error:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold text-center mb-10">
        📊 Parent Dashboard
      </h1>

      {!data ? (
        <p className="text-center">Loading analytics...</p>
      ) : (
        <div className="grid grid-cols-2 gap-8">

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-2">Most Active Category</h2>
            <p className="text-3xl text-blue-500">
              {data.topCategory}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-2">Total Activities</h2>
            <p className="text-3xl text-green-500">
              {data.totalActivities}
            </p>
          </div>

        </div>
      )}

    </div>
  )
}

export default Dashboard