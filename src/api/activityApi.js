import axios from "axios"

const API = "https://tinylearners.onrender.com/api/activity"

export const logActivity = async (data) => {
  try {
    const res = await axios.post(`${API}/log`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    console.log("API SUCCESS:", res.data)
    return res.data
  } catch (error) {
    console.log("Activity API Error:", error.message)
  }
}